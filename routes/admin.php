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

Route::get('/getSuggestionsExport', 'SuggestionsController@getSuggestionsExport');
Route::get('/getSuggestionsTenExport', 'SuggestionsController@getSuggestionsTenExport');
Route::get('/getSuggestionsNineExport', 'SuggestionsController@getSuggestionsNineExport');
Route::middleware(['auth:api', 'admin'])->group(function () {

    Route::get('/upload', function () {
        return view('upload');
    });
    Route::get('/suggestion', 'SuggestionsController@getSuggestions');
    Route::get('/suggestion_nine', 'SuggestionsController@getSuggestionsNine');
    Route::get('/suggestion_ten', 'SuggestionsController@getSuggestionsTen');


    Route::post('/postRecord', 'RecordsController@postRecord');
    Route::post('/import', 'RecordsController@importExcel');

    Route::post('/updateRecord', 'RecordsController@updateRecord');
    Route::post('/updateRecordTen', 'RecordsTenController@updateRecordTen');
    Route::post('/updateRecordNine', 'RecordsController@updateRecordNine');

    Route::post('/delete_suggestion', 'SuggestionsController@deleteSuggestion');
    Route::post('/delete_suggestion_ten', 'SuggestionsController@deleteSuggestionTen');
    Route::post('/delete_suggestion_nine', 'SuggestionsController@deleteSuggestionNine');
});
