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
            $table->string('ic9code')->nullable();
            $table->string('ic9codeinput')->nullable();
            $table->longText('ic9description')->nullable();
            $table->longText('ic9descriptionsuggest')->nullable();
            $table->string('ic10code')->nullable();
            $table->string('ic10codeinput')->nullable();
            $table->longText('ic10description')->nullable();
            $table->longText('ic10descriptionsuggest')->nullable();
            $table->string('name')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('record_id')->nullable();
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
