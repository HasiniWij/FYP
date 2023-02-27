<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
// use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index() {

        $result = DB::table('areas')->get();
        $areas=array();

        foreach ($result as $area) {
           array_push($areas,
              array(
                 "label"=>$area->area,
                 "value"=>$area->id
              )
           );
       }
        print json_encode($areas);
     }
}
