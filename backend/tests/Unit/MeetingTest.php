<?php

namespace Tests\Unit;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class MeetingTest extends TestCase
{
    use WithoutMiddleware;
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getMeetingSeries(){
        $response = $this->get('/api/meetingSeries/11');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'meetingSeries'
            ]);     
    }
    public function test_getMeetingTimeSlots(){
        $response = $this->get('/api/meetings/8');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'meetings',
            'title' ,
            'duration'
            ]);     
    }

    public function test_getMeetingWithBookedSlots(){
        $response = $this->get('/api/bookedMeetingSeries/38');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "meetingSeries",
            'bookedMeeting' => [
                '*' => [
                    'seriesId',
                    'dateTime'
               ]
             ]
            ]);     
    }
 
}
