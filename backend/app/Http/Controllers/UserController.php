<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Project;
use App\Models\ProjectArea;
use App\Models\Skill;
use App\Models\UserArea;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class UserController extends Controller
{
   public function __construct()
   {
       $this->middleware('auth.role:student,supervisor');
   }
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
   public function getUserProjects(string $id) {
      
      $result = Project::where('userId', $id)->get();
      $projects=array();
 
      foreach ($result as $project) {
         $areaResult = ProjectArea::where('projectId', $project['id'])->get();
         $skillResult = Skill::where('projectId', $project['id'])->get();
         $areas=[];
         $skills=[];
         foreach ($areaResult as $area) {
            array_push($areas,
            array(
               'value'=>$area['areaId']
            ));
         }
         foreach ($skillResult as $skill) {
            array_push($skills,
               $skill['skill']
            );
         }
         array_push($projects,
            array(
               'description'=>$project['description'],
               'areas'=>$areas,
               'skills'=>$skills
            )
         );
     }
      print json_encode($projects);
   }
   public function getUserAreas(string $id) {
          
      $userAreaIds = UserArea::where('userId', $id)->get();
      $userAreas=array();
      foreach ($userAreaIds as $id) {
         $area = Area::where('id', $id['areaId'])->first();
         array_push($userAreas,
            array(
               "label"=>$area->area,
               "value"=>$area->id
            )
         );
     }
      print json_encode($userAreas);
     }

     public function saveUserAreas(Request $request) {
      
      $data = $request->all();

      if($data['newInterests']){
         foreach ($data['newInterests'] as $area) {
            UserArea::create([
               'userId' => $data['userId'],
               'areaId' => $area['value']
            ]);
         }
      }

      if($data['removedInterests']){ 
         foreach ($data['removedInterests'] as $area) {
            $query =  UserArea::where('areaId', $area['value']);
            $query = $query->where('userId', $data['userId']);
            $query->delete();
         }
      }

      return response()->json([
         'status' => 'success'
      ]);
   }
   public function getProjects() {
      
      $result = Project::select('projects.*')->join('supervisors', 'supervisors.supervisorId', '=', 'projects.userId')->get();
      $projects=array();
 
      foreach ($result as $project) {
         $areaResult = ProjectArea::where('projectId', $project['id'])->get();
         $skillResult = Skill::where('projectId', $project['id'])->get();
         $areas='';
         $skills=[];
         foreach ($areaResult as $interest) {
            $interests = Area::where('id', $interest->areaId)->first();
            $areas = $areas.$interests->area.',';
        }
        $areas = rtrim($areas, ",");
         foreach ($skillResult as $skill) {
            array_push($skills,
               $skill['skill']
            );
         }
         array_push($projects,
            array(
               'description'=>$project['description'],
               'areas'=>$areas,
               'skills'=>$skills
            )
         );
     }
      print json_encode($projects);
   }
}
