<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Project;
use App\Models\Student;
use App\Models\Supervisor;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.role:admin');
    }
    public function PythonScript($data)
    {
        $fileName = 'C:/Users/THOSHIBA/Documents/mentor-mentee/backend/resources/calculateSimilarity.py';
        $process = new Process(
            ['python', $fileName, json_encode($data)],
            null,
            ['SYSTEMROOT' => getenv('SYSTEMROOT'), 'PATH' => getenv("PATH")]
        );
        $process->run();
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        return $process->getOutput();
    }

    public function getStudents()
    {
        $result = User::where('role', 'student')->get();
        $students = array();

        foreach ($result as $student) {
            array_push(
                $students,
                array(
                    "name" => $student->name,
                    "universityId" => strtok($student->email, '@')
                )
            );
        }
        return response()->json([
            'students' => $students
        ]);
    }

    public function matchWithProjects()
    {

        $userProjects = array();
        $studentProjects = array();
        $supervisorProjects = array();
        $supervisorCapacities = array();
        $matchedStudents = array();
        $fullSupervisors = array();
        $students = array();

        $result = Project::all();

        foreach ($result as $item) {
            if (isset($userProjects[$item['userId']])) {
                $userProjects[$item['userId']] .= ' ' . $item['description'];
            } else
                $userProjects[$item['userId']] = $item['description'];
        }

        foreach ($userProjects as $key => $value) {
            $user = User::where('id', $key)->first();
            if ($user['role'] === 'supervisor') {
                array_push($supervisorProjects, $value);
                $supervisor = Supervisor::where('supervisorId', $key)->first();
                array_push(
                    $supervisorCapacities,
                    array(
                        'key' => $key,
                        'capacity' => 0,
                        'numOfStudents' => $supervisor['numOfStudents']
                    )
                );
            } else {
                array_push($studentProjects, $value);
                array_push($students, $key);
            }
        }
        $projects = array(
            'supervisorProjects' => $supervisorProjects,
            'studentProjects' => $studentProjects
        );

        $output = $this->PythonScript($projects);
        $scores = json_decode($output);
        foreach ($scores as $score) {
            if (!in_array($score->index[1], $matchedStudents) && !in_array($score->index[0], $fullSupervisors)) {
                array_push($matchedStudents, $score->index[1]);
                $supervisorCapacities[$score->index[0]]['numOfStudents']++;
                if ($supervisorCapacities[$score->index[0]]['numOfStudents'] == $supervisorCapacities[$score->index[0]]['capacity']) {
                    array_push($fullSupervisors, $score->index[0]);
                }
                $student = Student::where('studentId', $students[$score->index[1]])->first();
                $student->supervisorId = $supervisorCapacities[$score->index[0]]['key'];
                $student->matchedUsing = 'projects';
                $student->save();
            }
        }
        // add matched using requests too
        foreach ($supervisorCapacities as $supervisor) {
            $count = Student::where('supervisorId', $supervisor['key'])->where('matchedUsing', 'projects')->count();
            $updateSupervisor = Supervisor::where('supervisorId', $supervisor['key'])->first();
            $updateSupervisor->numOfStudents = $count;
            $updateSupervisor->save();
        }

        return response()->json([
            'status' => 'success'
        ]);
    }
    public function updateSupervisorCapacity(Request $request)
    {
        $data = $request->all();
        $supervisor = Supervisor::find($data['id']);
        $supervisor->capacity = $data['capacity'];
        $supervisor->save();
        return response()->json([
            'status' => 'success'
        ]);
    }
    public function getAdminStatistics()
    {
        $studentCount = Student::count();
        $totalCapacity = Supervisor::sum('capacity');
        return response()->json([
            'studentCount' => $studentCount,
            'totalCapacity' => $totalCapacity
        ]);
    }

    public function matchWithInterests()
    {
        $supervisorAreas = array();
        $students = Student::join('user_areas', 'user_areas.userId', '=', 'students.studentId')->groupBy('studentId')->where('matchedUsing', '')->orWhere('matchedUsing', 'interests')->get();
        $supervisors = Supervisor::join('user_areas', 'user_areas.userId', '=', 'supervisors.supervisorId')->groupBy('supervisorId')->get();
        foreach ($supervisors as $supervisor) {
            $result = Area::select('area')->join('user_areas', 'user_areas.areaId', '=', 'areas.id')->where('user_areas.userId', '=', $supervisor->supervisorId)->get();
            $areas = array();
            foreach ($result as $area) {
                array_push(
                    $areas,
                    $area->area
                );
            }
            $supervisorAreas[$supervisor->supervisorId] = $areas;
        }

        $scores = array();
        foreach ($students as $student) {
            $studentAreaResult = Area::select('area')
                ->join('user_areas', 'user_areas.areaId', '=', 'areas.id')
                ->where('user_areas.userId', '=', $student->studentId)->get();
            $studentAreas = array();
            foreach ($studentAreaResult as $studentArea) {
                array_push(
                    $studentAreas,
                    $studentArea->area
                );
            }
            foreach ($supervisors as $supervisor) {

                $score = $this->getJaccardCoefficient(
                    $studentAreas,
                    $supervisorAreas[$supervisor->supervisorId]
                );
                array_push(
                    $scores,
                    array(
                        'supervisorId' => $supervisor->supervisorId,
                        'studentId' => $student->studentId,
                        'score' => $score
                    )
                );
            }
        }
        usort($scores, function ($a, $b) {
            return $a['score'] < $b['score'];
        });

        $this->assignStudentsWithInterests($scores, $supervisors);
        $this->updateNumberOfStudents($supervisors);

    }
    private function assignStudentsWithInterests($scores, $supervisors)
    {
        $matchedStudents = array();
        $fullSupervisors = array();
        foreach ($scores as $score) {
            if (!in_array($score['studentId'], $matchedStudents) && !in_array($score['supervisorId'], $fullSupervisors)) {
                array_push($matchedStudents, $score['studentId']);
                foreach ($supervisors as $supervisor) {
                    if ($score['supervisorId'] == $supervisor->supervisorId) {
                        $supervisor->numOfStudents++;
                        if ($supervisor->numOfStudents == $supervisor->capacity) {
                            array_push($fullSupervisors, $score['supervisorId']);
                        }
                    }
                }

                $student = Student::where('studentId', $score['studentId'])->first();
                $student->supervisorId = $score['supervisorId'];
                $student->matchedUsing = 'interests';
                $student->save();
            }
        }
    }
    private function matchRemaining()
    {
        $students = Student::where('supervisorId', null)->get();
        $supervisors = Supervisor::whereRaw('capacity != numOfStudents')->get();
        foreach ($students as $student) {
            $min = $supervisors->firstWhere('numOfStudents', $supervisors->min('numOfStudents'));
            $min->numOfStudents++;
            if ($min->capacity == $min->numOfStudents) {
                $id = $min->supervisorId;
                $key = $supervisors->search(function ($i) use ($id) {
                    return $i->supervisorId === $id;
                });
                $supervisors->forget($key);
            }
            $student = Student::where('studentId', $student->studentId)->first();
            $student->supervisorId = $min->supervisorId;
            $student->matchedUsing = 'random';
            $student->save();

        }
        $this->updateNumberOfStudents($supervisors);
        print(json_encode($supervisors));
    }

    private function getJaccardCoefficient($studentAreas, $supervisorAreas)
    {
        $arr_intersection = array_intersect($studentAreas, $supervisorAreas);
        $arr_union = array_merge($studentAreas, $supervisorAreas);
        $coefficient = sizeOf($arr_intersection) / sizeOf($arr_union);
        return $coefficient;
    }

    private function updateNumberOfStudents($supervisors)
    {
        foreach ($supervisors as $supervisor) {
            $count = Student::where('supervisorId', $supervisor->supervisorId)->count();
            $updateSupervisor = Supervisor::where('supervisorId', $supervisor->supervisorId)->first();
            $updateSupervisor->numOfStudents = $count;
            $updateSupervisor->save();
        }
    }

    public function match()
    {
        $this->matchWithProjects();
        $this->matchWithInterests();
        $this->matchRemaining();
    }
}