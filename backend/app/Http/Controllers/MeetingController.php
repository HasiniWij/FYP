<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\MeetingSeries;
use App\Models\Student;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function saveMeetingSeries(Request $request)
    {
        $data = $request->all();
        $series = MeetingSeries::create([
            'title' => $data['title'],
            'durationInMinutes' => (int) $data['duration'],
            'supervisorId' => $data['userId']
        ]);
        foreach ($data['dates'] as $dateTime) {
            Meeting::create([
                'dateTime' => $dateTime,
                'meetingSeriesId' => $series['id'],
            ]);
        }
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function getMeetingSeries(string $supervisorId)
    {
        $result = MeetingSeries::where('supervisorId', $supervisorId)->get();
        return response()->json([
            'meetingSeries' => $result
        ]);
    }
    public function getMeetingTimeSlots(string $meetingSeriesId)
    {
        $meetings = Meeting::where('meetingSeriesId', $meetingSeriesId)
            ->where('studentId', 0)->get();
        $series = MeetingSeries::where('id', $meetingSeriesId)->first();
        
        return response()->json([
            'meetings' => $meetings,
            'title' => $series->title,
            'duration' => $series->durationInMinutes
        ]);
    }

    public function bookMeeting(Request $request)
    {
        $data = $request->all();
        $updateMeeting = Meeting::where('id', $data['meetingId'])->first();
        $updateMeeting->studentId = $data['userId'];
        $updateMeeting->save();
        return response()->json([
            'status' => 'success'
        ]);
    }
    public function getMeetingWithBookedSlots(string $studentId)
    {
        $student = Student::where('studentId', $studentId)->first();
        $meetingSeries = MeetingSeries::where('supervisorId', $student->supervisorId)->get();
        $bookedMeeting = array();
        foreach ($meetingSeries as $series) {
            $meetings = Meeting::where('meetingSeriesId', $series->id)
                ->where('studentId', $studentId)->first();
            if ($meetings) {
                array_push(
                    $bookedMeeting,
                    array(
                        'seriesId' => $series->id,
                        'dateTime' => $meetings->dateTime
                    )
                );
            }
        }
        return response()->json([
            "meetingSeries" => $meetingSeries,
            "bookedMeeting" => $bookedMeeting
        ]);
    }
}