<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\PlaylistNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Resources\PlaylistCollection;
use App\Http\Resources\PlaylistResource;
use App\Models\Playlist;

class PlaylistController extends Controller {

    public function index()
    {
//        return PlaylistResource::
        return [
            'data' => Playlist::latest()->take(5)->get(['id', 'title', 'play_date'])
        ];
    }

    public function show($id): PlaylistResource
    {
        try {
            return new PlaylistResource(Playlist::findOrFail($id));
        } catch (\Exception $e) {
            throw new PlaylistNotFoundException;
        }
    }

    public function destroy(Playlist $playlist)
    {
        $playlist->delete();

        return response()->json(['data' => ['message' => "Playlist deleted"]]);
    }
}
