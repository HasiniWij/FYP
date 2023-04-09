<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Supervisor;
use App\Models\User;
use App\Models\UserArea;
use Illuminate\Http\Request;

class UserController extends Controller
{
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
}
