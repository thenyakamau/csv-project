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

Route::get('/', function () {
    return view('welcome');
})->name('welcome');

Route::get('/search', function () {
    return view('search');
})->name('search');

Route::get('/map', function () {
    return view('mapping');
})->name('map');

Route::get('/getRecords', 'RecordsController@getRecords');
Route::get('/getRecord', 'RecordsController@getRecord');
Route::get('/fetchIc9to10Records', 'RecordsController@fetchIc9to10Records');

Route::get('/getRecordsTen', 'RecordsTenController@getRecordsTen');
Route::get('/getRecordTen', 'RecordsTenController@getRecordTen');

Auth::routes();
Route::middleware('auth:web')->group(function () {
    Route::get('/home', 'HomeController@index')->name('home');
    Route::post('/postSuggestions', 'SuggestionsController@postSuggestions');
    Route::post('/postAmSuggestions', 'SuggestionsController@postAmSuggestions');
    Route::post('/post10Suggestion', 'SuggestionsController@post10Suggestion');
});
