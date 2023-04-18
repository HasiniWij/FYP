<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Project;
use App\Models\ProjectArea;
use App\Models\Skill;
use App\Models\Student;
use App\Models\Supervisor;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class AdminController extends Controller{
    
    public function __construct()
    {
        $this->middleware('auth.role:admin,supervisor');
    }
    public function PythonScript($data){
        $fileName = 'C:/Users/THOSHIBA/Documents/mentor-mentee/backend/resources/calculateSimilarity.py';
        $process = new Process(['python',$fileName ,json_encode($data)],null,
                               ['SYSTEMROOT' => getenv('SYSTEMROOT'), 'PATH' => getenv("PATH")]
                              );
        $process->run();  
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        return $process->getOutput();
    }

    public function getStudents() {
        $result = User::where('role', 'student')->get();
        $students=array();

        foreach ($result as $student) {
        array_push($students,
            array(
                "name"=>$student->name,
                "universityId"=>strtok($student->email, '@')
            )
        );
        }
        print json_encode($students);
   }

   public function matchWithProjects(){

        $result = Project::all();

        $userProjects = array();
        $studentProjects = array();
        $supervisorProjects = array();
        $supervisorCapacities=array();
        $matchedStudents=array();
        $fullSupervisors=array();
        $students=array();

        foreach ($result as $item) {
            if(isset($userProjects[$item['userId']])){
                $userProjects[$item['userId']] .= ' '.$item['description'];
            }
            else $userProjects[$item['userId']] = $item['description'];
        }
        
        foreach ($userProjects as $key=>$value) {
            $user = User::where('id', $key)->first();
            if($user['role']==='supervisor'){
                array_push($supervisorProjects, $value);
                $supervisor = Supervisor::where('supervisorId', $key)->first();
                array_push($supervisorCapacities, array(
                    'key'=>$key,
                    'capacity'=>$supervisor['capacity'],
                    'numOfStudents'=>0
                    )
                );
            }
            else{
                array_push($studentProjects, $value);
                array_push($students, $key);
            }
        }
        $projects = array(
            'supervisorProjects'=>$supervisorProjects,
            'studentProjects'=>$studentProjects
        ); 
       
        $output = $this->PythonScript($projects);
        $scores=json_decode($output);
        foreach($scores as $score){
            if(!in_array($score->index[1],$matchedStudents) && !in_array($score->index[0],$fullSupervisors) ){
                array_push($matchedStudents,$score->index[1]);
                $supervisorCapacities[$score->index[0]]['numOfStudents'] ++;
                if($supervisorCapacities[$score->index[0]]['numOfStudents']==$supervisorCapacities[$score->index[0]]['capacity']){
                    array_push($fullSupervisors,$score->index[0]);
                } 
                $student = Student::where('studentId',$students[$score->index[1]])->first();
                $student->supervisorId = $supervisorCapacities[$score->index[0]]['key'];             
                $student->save();
            }
        }
        return response()->json([
            'status' => 'success'
         ]);
   }
    public function updateSupervisorCapacity(Request $request){
        $data = $request->all();
        $supervisor = Supervisor::find($data['id']);
        $supervisor->capacity = $data['capacity'];
        $supervisor->save();
        return response()->json([
            'status' => 'success'
         ]);
    }
    public function getAdminStatistics(){
        $studentCount = Student::count();
        $totalCapacity = Supervisor::sum('capacity');
        return response()->json([
            'studentCount' => $studentCount,
            'totalCapacity' => $totalCapacity
         ]);
    }

    public function match(){
        $this->matchWithProjects();
    }
}
