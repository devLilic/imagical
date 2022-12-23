<?php

use App\Exceptions\PlaylistNotFoundException;
use App\Http\Controllers\Api\ImagesController;
use App\Http\Controllers\Api\PlaylistController;
use App\Http\Controllers\ExternalImagesController;
use App\Http\Controllers\LocalImagesController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request)
{
    return $request->user();
});
Route::get('images', [ImagesController::class, 'index']);
Route::get('search-images', [LocalImagesController::class, 'search']);
Route::get('relevant', [LocalImagesController::class, 'relevant']);
Route::get('resources', [ExternalImagesController::class, 'getImages']);
Route::get('crop', [ExternalImagesController::class, 'crop']);

Route::post('upload', [LocalImagesController::class, 'store']);
Route::delete('images', [LocalImagesController::class, 'destroy']);
Route::post('addTags', [LocalImagesController::class, 'storeTags']);

Route::get('playlists', [PlaylistController::class, 'index']);
Route::get('playlists/{id}', [PlaylistController::class, 'show']);
Route::delete('playlists/{playlist}', [PlaylistController::class, 'destroy'])
    ->missing(fn() => throw new PlaylistNotFoundException);;

