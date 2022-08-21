<?php

use App\Http\Controllers\LocalImagesController;
use App\Http\Controllers\TitlesController;
use App\Services\Articles\Article;
use Facades\App\Services\Articles\Articles;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function ()
{
    return redirect()->route('titles');
});

Route::middleware(['auth'])->group(function(){
    Route::get('titles', [TitlesController::class, 'index'])->name('titles');

    Route::post('titles', [TitlesController::class, 'store']);

    Route::get('search', function (){
        return redirect()->route('titles');
    });

    Route::post('search', [TitlesController::class, 'search']);

    Route::get('upload', [LocalImagesController::class, 'create'])->name('upload-images');
    Route::post('upload', [LocalImagesController::class, 'store']);
});

Route::get('/dashboard', function ()
{
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';
