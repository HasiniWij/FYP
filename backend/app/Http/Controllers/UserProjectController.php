<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Project;
use App\Models\ProjectArea;
use App\Models\Skill;
use App\Models\UserArea;
use Illuminate\Http\Request;

class UserProjectController extends Controller
{
   public function __construct()
   {
      $this->middleware('auth.role:student,supervisor');
   }
   public function getAreas()
   {
      $result = Area::all();
      $areas = array();

      foreach ($result as $area) {
         array_push(
            $areas,
            array(
               "label" => $area->area,
               "value" => $area->id
            )
         );
      }
      return response()->json([
         'areas' => $areas
      ]);
   }
   public function saveProject(Request $request)
   {

      $request->validate([
         'description' => 'required',
      ]);

      $data = $request->all();

      $project = Project::create([
         'description' => $data['description'],
         'userId' => $data['userId']
      ]);

      if ($data['skills']) {
         foreach ($data['skills'] as $skill) {
            Skill::create([
               'skill' => $skill,
               'projectId' => $project['id']
            ]);
         }
      }

      if ($data['areas']) {
         foreach ($data['areas'] as $area) {
            ProjectArea::create([
               'areaId' => $area['value'],
               'projectId' => $project['id']
            ]);
         }
      }

      return response()->json([
         'status' => 'success',
         'projectId' => $project['id']
      ]);
   }
   public function getUserProjects(string $id)
   {

      $result = Project::where('userId', $id)->get();
      $projects = array();

      foreach ($result as $project) {
         $areaResult = ProjectArea::join('areas', 'areas.id', '=', 'project_areas.areaId')
            ->where('projectId', $project['id'])->get();
         $skillResult = Skill::where('projectId', $project['id'])->get();
         $areas = [];
         $skills = [];
         foreach ($areaResult as $area) {
            array_push(
               $areas,
               array(
                  'label' => $area['area']
               )
            );
         }
         foreach ($skillResult as $skill) {
            array_push(
               $skills,
               $skill['skill']
            );
         }
         array_push(
            $projects,
            array(
               'id' => $project['id'],
               'description' => $project['description'],
               'areas' => $areas,
               'skills' => $skills
            )
         );
      }
      return response()->json([
         'projects' => $projects
      ]);
   }
   public function getUserAreas(string $id)
   {

      $userAreaIds = UserArea::where('userId', $id)->get();
      $userAreas = array();
      foreach ($userAreaIds as $id) {
         $area = Area::where('id', $id['areaId'])->first();
         array_push(
            $userAreas,
            array(
               "label" => $area->area,
               "value" => $area->id
            )
         );
      }
      return response()->json([
         'userAreas' => $userAreas
      ]);
   }
   public function deleteProject($projectId)
   {
      ProjectArea::where('projectId', $projectId)->delete();
      Skill::where('projectId', $projectId)->delete();
      Project::destroy($projectId);

      return response()->json([
         'status' => 'success'
      ]);
   }

   public function saveUserAreas(Request $request)
   {

      $data = $request->all();

      if ($data['newInterests']) {
         foreach ($data['newInterests'] as $area) {
            UserArea::create([
               'userId' => $data['userId'],
               'areaId' => $area['value']
            ]);
         }
      }

      if ($data['removedInterests']) {
         foreach ($data['removedInterests'] as $area) {
            $query = UserArea::where('areaId', $area['value']);
            $query = $query->where('userId', $data['userId']);
            $query->delete();
         }
      }

      return response()->json([
         'status' => 'success'
      ]);
   }
   public function getProjects($supervisorId = null)
   {
      if ($supervisorId) {
         $result = Project::select('projects.*')
            ->join('supervisors', 'supervisors.supervisorId', '=', 'projects.userId')
            ->where('supervisorId', $supervisorId)->get();

      } else {
         $result = Project::select('projects.*')->join('supervisors', 'supervisors.supervisorId', '=', 'projects.userId')->get();
      }
      $projects = array();

      foreach ($result as $project) {
         $areaResult = ProjectArea::where('projectId', $project['id'])->get();
         $skillResult = Skill::where('projectId', $project['id'])->get();
         $areas = '';
         $skills = [];
         foreach ($areaResult as $interest) {
            $interests = Area::where('id', $interest->areaId)->first();
            $areas = $areas . $interests->area . ',';
         }
         $areas = rtrim($areas, ",");
         foreach ($skillResult as $skill) {
            array_push(
               $skills,
               $skill['skill']
            );
         }
         array_push(
            $projects,
            array(
               'description' => $project['description'],
               'areas' => $areas,
               'skills' => $skills
            )
         );
      }
      return response()->json([
         'projects' => $projects
      ]);
   }
}