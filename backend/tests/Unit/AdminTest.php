<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use WithoutMiddleware;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_getStudents(){
        $response = $this->get('/api/students');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'students' => [
                '*' => [
                    'name',
                    'universityId'
               ]
             ]
            ]);     
    }
    public function test_getAdminStatistics(){
        $response = $this->get('/api/adminStatistics');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'studentCount' ,
            'totalCapacity'
            ]);     
    }
    public function test_updateSupervisorCapacity()
    {
        $response = $this->postJson('/api/updateCapacity', [
            'id'=>39,
            'capacity'=>5,
        ]);
 
        $response
            ->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);      
    }
    
}
