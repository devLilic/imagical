<?php

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



Route::post('results', function (Request $request)
{
    $req = $request->get('searchQuery');
    $api_url = 'https://www.googleapis.com/customsearch/v1';

    $results = Http::get($api_url, [
        'key' => 'AIzaSyB0mkP4qfb_13uooN9DARQbxPDvnX9Goqs',
        'cx' => '3799fa5b7854847b0',
        'gl' => 'md',
        'imgColorType' => 'color',
        'dateRestrict' => 'm[12]',
        'searchType' => 'image',
//        'sort' => 'date-sdate',
        'q' => $req
    ]);

    return response()->json($results->json(), 200);
});
