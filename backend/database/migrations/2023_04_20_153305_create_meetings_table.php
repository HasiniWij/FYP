<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();         
            $table->unsignedBigInteger('meetingSeriesId'); 
            $table->unsignedBigInteger('studentId');   
            $table->string('dateTime');   
            $table->timestamps();
            $table->foreign('meetingSeriesId')->references('id')->on('meeting_series');
            $table->foreign('studentId')->references('studentId')->on('students');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meetings');
    }
};
