<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware(['auth:web', 'admin'])->group(function () {

    Route::get('/upload', function () {
        return view('upload');
    });
    Route::get('/', 'SuggestionsController@getSuggestions');
    Route::get('/updateRecord', 'RecordsController@updateRecord');

    Route::post('/postRecord', 'RecordsController@postRecord');
    Route::post('/import', 'RecordsController@importExcel');


    Route::get('/updateRecordTen', 'RecordsTenController@updateRecordTen');

    Route::get('/suggestion/{id}', 'SuggestionsController@deleteSuggestion');
    Route::get('/suggestion_ten/{id}', 'SuggestionsController@deleteSuggestionTen');

    Route::get('/getSuggestionsExport', 'SuggestionsController@getSuggestionsExport');
    Route::get('/getSuggestionsTenExport', 'SuggestionsController@getSuggestionsTenExport');
});
