<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use WithoutMiddleware;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_login()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'w1885307@my.westminster.ac.uk',
            'password' => '123456',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
                'user' => [
                    "id",
                    "name",
                    "email",
                    "role"
                ]
            ]);
    }

    public function test_invalidLogin()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'w1885307@my.westminster.ac.uk',
            'password' => '12345678',
        ]);

        $response->assertStatus(401);
    }


}