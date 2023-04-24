<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Supervisor;
use App\Models\UserArea;
use Illuminate\Foundation\Auth\User;

class SupervisionController extends Controller
{ 
    public function getSupervisors() {
        $result = User::where('role', 'supervisor')->get();
        $supervisors=array();
        foreach ($result as $supervisor) {
            $supervisorDetails = Supervisor::where('supervisorId', $supervisor->id)->first();
            $supervisorInterests = UserArea::where('userId', $supervisor->id)->get();
            $interests='';
            foreach ($supervisorInterests as $supervisorInterest) {
                $area = Area::where('id', $supervisorInterest->areaId)->first();
                $interests = $interests.$area->area.',';
            }
            $interests = rtrim($interests, ",");
            array_push($supervisors,
                array(
                    "name"=>$supervisor->name,
                    "email"=>$supervisor->email,
                    "capacity"=>$supervisorDetails->capacity,
                    "id"=>$supervisor->id,
                    "interests"=>$interests
                )
            );
        }
        print json_encode($supervisors);
        }
        public function getStudents($supervisorId)
        {
            $result = User::join('students', 'users.id', '=', 'students.studentId')->where('supervisorId', $supervisorId)->get();
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
            print json_encode($students);
        }
}
