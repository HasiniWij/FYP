<?php

namespace Tests\Unit;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class UserTest extends TestCase
{
    use WithoutMiddleware;
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getAreas()
    {
        $response = $this->get('/api/areas');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'areas' => [
                '*' => [
                   'value',
                   'label'
               ]
             ]
            ]);    
    }

    public function test_saveProject()
    {
        $response = $this->postJson('/api/saveProject', [
            'description'=>'description',
            'areas'=>[],
            'skills'=>['html','php'],
            'userId'=>'38'
        ]);
 
        $response
            ->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);      
    }

    public function test_saveUserAreas()
    {
        $response = $this->postJson('/api/saveUserAreas', [
            'removedInterests'=>[],
            'newInterests'=>[['value'=>2], ['value'=>4]],
            'userId'=>'38'
        ]);
 
        $response
            ->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);      
    }
    
    public function test_getUserProjects(){
        $response = $this->get('/api/userProjects/15');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'projects' => [
                '*' => [
                    'description',
                    'areas',
                    'skills'
               ]
             ]
            ]);     
    }

    public function test_getProjects(){
        $response = $this->get('/api/projects');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'projects' => [
                '*' => [
                    'description',
                    'areas',
                    'skills'
               ]
             ]
            ]);     
    }

    public function test_getUserAreas()
    {
        $response = $this->get('/api/userAreas/7');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'userAreas' => [
                '*' => [
                   'value',
                   'label'
               ]
             ]
            ]);    
    }
}
