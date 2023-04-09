<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Supervisor;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class AdminController extends Controller{
    public function PythonScript(){
        $process = new Process(['python', 'C:/Users/THOSHIBA/Documents/mentor-mentee/backend/app/Http/Controllers/teest.py'],
        null,
    ['SYSTEMROOT' => getenv('SYSTEMROOT'), 'PATH' => getenv("PATH")]
    
    );
        $process->run();
        
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $data = $process->getOutput();
        print json_encode($data);
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

   public function getSupervisors() {
    $result = User::where('role', 'supervisor')->get();
    $supervisors=array();
    foreach ($result as $supervisor) {
        $supervisorDetails = Supervisor::where('supervisorId', $supervisor->id)->first();
        array_push($supervisors,
            array(
                "name"=>$supervisor->name,
                "email"=>$supervisor->email,
                "capacity"=>$supervisorDetails->capacity,
                "id"=>$supervisor->id
            )
        );
    }
    print json_encode($supervisors);
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
}
