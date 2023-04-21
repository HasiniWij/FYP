<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\SupervisionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::post('register',[AuthController::class,'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('userAreas/{id}', [UserController::class,'getUserAreas']);
Route::get('userProjects/{id}', [UserController::class,'getUserProjects']);
Route::get('areas', [UserController::class,'getAreas']);
Route::post('saveProject', [UserController::class, 'saveProject']);
Route::post('saveUserAreas', [UserController::class, 'saveUserAreas']);
Route::get('projects', [UserController::class,'getProjects']);
Route::get('supervisors', [SupervisionController::class,'getSupervisors'])->middleware('auth.role:student,admin');
Route::get('students', [AdminController::class,'getStudents']);
Route::post('updateCapacity', [AdminController::class, 'updateSupervisorCapacity']);
Route::get('adminStatistics', [AdminController::class,'getAdminStatistics']);
Route::get('match', [AdminController::class,'match']);
Route::post('saveMeeting', [MeetingController::class,'saveMeetingSeries']);
Route::get('bookedMeetingSeries/{id}', [MeetingController::class,'getMeetingWithBookedSlots']);
Route::get('meetings/{id}', [MeetingController::class,'getMeetingTimeSlots']);
Route::get('meetingSeries/{id}', [MeetingController::class,'getMeetingSeries']);
Route::post('bookMeeting', [MeetingController::class,'bookMeeting']);