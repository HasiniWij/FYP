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
