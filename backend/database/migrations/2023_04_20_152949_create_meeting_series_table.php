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
        Schema::create('meeting_series', function (Blueprint $table) {
            $table->id();         
            $table->string('title');
            $table->unsignedBigInteger('supervisorId'); 
            $table->smallInteger('durationInMinutes');   
            $table->timestamps();
            $table->foreign('supervisorId')->references('supervisorId')->on('supervisors');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meeting_series');
    }
};
