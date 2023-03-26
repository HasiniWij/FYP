<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectArea;
use App\Models\Skill;
use App\Models\UserArea;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function getAreas() {

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
   public function saveProject(Request $request) {

      $request->validate([
         'description' => 'required',
     ]);
        
     $data = $request->all();
     
      $project =  Project::create([
         'description' => $data['description'],
         'userId' => $data['userId']
      ]);

      if($data['skills']){
         foreach ($data['skills'] as $skill) {
            Skill::create([
               'skill' => $skill,
               'projectId' => $project['id']
            ]);
        }
      }

      if($data['areas']){
         foreach ($data['areas'] as $area) {
            ProjectArea::create([
               'areaId' => $area['value'],
               'projectId' => $project['id']
            ]);
        }
      }

      return response()->json([
         'status' => 'success'
         ]); 
   }
}
