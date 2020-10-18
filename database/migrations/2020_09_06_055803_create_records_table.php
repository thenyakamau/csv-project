<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->string('ICD-9-BPA code');
            $table->longText('ICD-9-BPA code description');
            $table->string('Valid ICD-9-BPA code')->nullable();
            $table->longText('ICD-10-AM 1st edition code map 1')->nullable();
            $table->longText('ICD-10-AM code description map 1')->nullable();
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
        Schema::dropIfExists('records');
    }
}
