<?php

use App\Http\Controllers\ExternalImagesController;
use App\Http\Controllers\LocalImagesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('images', [LocalImagesController::class, 'index']);
Route::get('search-images', [LocalImagesController::class, 'search']);
Route::get('relevant', [LocalImagesController::class, 'relevant']);
Route::get('resources', [ExternalImagesController::class, 'getImages']);
Route::get('crop', [ExternalImagesController::class, 'crop']);



Route::post('upload', [LocalImagesController::class, 'store']);
Route::delete('images', [LocalImagesController::class, 'destroy']);
Route::post('addTags', [LocalImagesController::class, 'storeTags']);
