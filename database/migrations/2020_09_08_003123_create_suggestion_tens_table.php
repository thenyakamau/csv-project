<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuggestionTensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('suggestion_tens', function (Blueprint $table) {
            $table->id();
            $table->string('ic10code');
            $table->longText('ic10description');
            $table->longText('ic10descriptionsuggest')->nullable();
            $table->string('ic10amcode');
            $table->longText('ic10amdescription');
            $table->longText('ic10amdescriptionsuggest')->nullable();
            $table->string('name');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('record_id');
            $table->longText('reason')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('record_id')->references('id')->on('records_tens')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('suggestion_tens');
    }
}
