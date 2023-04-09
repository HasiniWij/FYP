<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupervisorController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::resource('supervisor', SupervisorController::class);
Route::get('userAreas/{id}', [ProjectController::class,'getUserAreas']);
Route::get('userProjects/{id}', [ProjectController::class,'getUserProjects']);
Route::get('areas', [ProjectController::class,'getAreas'])->middleware('auth.role:student,supervisor');
Route::post('register',[AuthController::class,'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('saveProject', [ProjectController::class, 'saveProject']);
Route::post('updateCapacity', [AdminController::class, 'updateSupervisorCapacity']);
Route::post('saveUserAreas', [ProjectController::class, 'saveUserAreas']);
Route::get('students', [AdminController::class,'getStudents']);
Route::get('supervisors', [AdminController::class,'getSupervisors']);
