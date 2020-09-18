<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecordNinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('record_nines', function (Blueprint $table) {
            $table->id();
            $table->string('ICD9_Code');
            $table->string('ICD9_Description');
            $table->string('ICD10_Code')->nullable();
            $table->string('ICD10_Descriptiom')->nullable();
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
        Schema::dropIfExists('record_nines');
    }
}
