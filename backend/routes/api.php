<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\SupervisionController;
use App\Http\Controllers\UserProjectController;
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

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('logout', [AuthController::class, 'logout']);
Route::get('userAreas/{id}', [UserProjectController::class, 'getUserAreas']);
Route::get('userProjects/{id}', [UserProjectController::class, 'getUserProjects']);
Route::get('areas', [UserProjectController::class, 'getAreas']);
Route::post('saveProject', [UserProjectController::class, 'saveProject']);
Route::post('saveUserAreas', [UserProjectController::class, 'saveUserAreas']);
Route::get('projects/{id?}', [UserProjectController::class, 'getProjects']);
Route::get('assignedSupervisor/{id}', [SupervisionController::class, 'getSupervisor']);
Route::get('deleteProject/{id}', [UserProjectController::class, 'deleteProject']);
Route::get('supervisors', [SupervisionController::class, 'getSupervisors'])->middleware('auth.role:student,admin');
Route::get('supervisorStudents/{id}', [SupervisionController::class, 'getStudents'])->middleware('auth.role:supervisor');
Route::get('students', [AdminController::class, 'getStudents']);
Route::post('updateCapacity', [AdminController::class, 'updateSupervisorCapacity']);
Route::get('adminStatistics', [AdminController::class, 'getAdminStatistics']);
Route::get('match', [AdminController::class, 'match']);
Route::post('saveMeeting', [MeetingController::class, 'saveMeetingSeries'])->middleware('auth.role:supervisor');
Route::get('bookedMeetingSeries/{id}', [MeetingController::class, 'getMeetingWithBookedSlots'])->middleware('auth.role:student');
Route::get('meetings/{id}', [MeetingController::class, 'getMeetingTimeSlots'])->middleware('auth.role:student');
Route::get('meetingSeries/{id}', [MeetingController::class, 'getMeetingSeries'])->middleware('auth.role:supervisor');
Route::post('bookMeeting', [MeetingController::class, 'bookMeeting'])->middleware('auth.role:student');
Route::get('meetingInformation/{id}', [MeetingController::class, 'getMeetingInformation'])->middleware('auth.role:supervisor');