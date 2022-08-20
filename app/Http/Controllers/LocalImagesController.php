<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Tag;
use Illuminate\Http\Request;

class LocalImagesController extends Controller {

    public function index()
    {
        $images = Image::with('tags')->take(20)->get();
        $images->map(fn($image) => $image->url = asset("images/$image->url"));
        return $images;
    }

    public function search(Request $request)
    {
        $tag = Tag::where('title', $request->search)->first();
        return $tag->images()->get();
    }
}
