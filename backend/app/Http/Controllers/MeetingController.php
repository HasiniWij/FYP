<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\MeetingSeries;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function saveMeetingSeries(Request $request)    
    {
        $data = $request->all();
        $series=MeetingSeries::create([
            'title'=>$data['title'],
            'durationInMinutes'=>(int)$data['duration'],
            'supervisorId'=>$data['userId']
          ]);
          foreach($data['dates'] as $dateTime){
            Meeting::create([
                'dateTime'=>$dateTime,
                'meetingSeriesId'=>$series['id'],
              ]);
          }
        return response()->json([
            'status' => 'success'
        ]); 
    }
    
    public function getMeetingSeries(string $id)    
    {
        $result = MeetingSeries::where('supervisorId', $id)->get();
        return (json_encode($result));
    }
    
}
