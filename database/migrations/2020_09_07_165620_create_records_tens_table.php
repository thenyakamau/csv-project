<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecordsTensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('records_tens', function (Blueprint $table) {
            $table->id();
            $table->string('ICD-10 code');
            $table->longText('ICD-10 code descriptor');
            $table->string('ICD-10-AM Map')->nullable();
            $table->longText('ICD-10-AM code descriptor')->nullable();
            $table->integer('votes')->nullable()->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('records_tens');
    }
}
