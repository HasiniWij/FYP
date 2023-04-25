<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class SupervisionTest extends TestCase
{
    use WithoutMiddleware;
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getSupervisors(){
        $response = $this->get('/api/supervisors');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'supervisors' => [
                '*' => [
                    "name",
                    "email",
                    "capacity",
                    "id",
                    "interests"
               ]
             ]
            ]);     
    }
    public function test_getStudents(){
        $response = $this->get('/api/supervisorStudents/11');
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
}
