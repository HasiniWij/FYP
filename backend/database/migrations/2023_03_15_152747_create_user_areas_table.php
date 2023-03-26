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
        Schema::create('user_areas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('areaId');
            $table->unsignedBigInteger('userId');
            // $table->index('areaId');
            // $table->index('userId');
            $table->foreign('areaId')->references('id')->on('areas');
            $table->foreign('userId')->references('id')->on('users');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_areas');
    }
};
