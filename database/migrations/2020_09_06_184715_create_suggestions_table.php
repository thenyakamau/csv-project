<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuggestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('suggestions', function (Blueprint $table) {
            $table->id();
            $table->string('ic9code');
            $table->string('ic9description');
            $table->string('ic9descriptionsuggest')->nullable();
            $table->string('ic10code');
            $table->string('ic10description');
            $table->string('ic10descriptionsuggest')->nullable();
            $table->string('name');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('record_id');
            $table->longText('reason')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('record_id')->references('id')->on('records')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('suggestions');
    }
}
