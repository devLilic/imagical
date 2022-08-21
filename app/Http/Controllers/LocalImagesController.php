<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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

    public function create()
    {
        return Inertia::render('Images/Upload');
    }

    public function store()
    {
        $files = request('files');
        $date = Carbon::now()->format('Ymd');
//        dd(Image::first());
        $number = 0;
        foreach ($files as $file){

            $path = `img_{$date}_{$number}`;
            Storage::disk('public')->put($file);
        }
        dd($date);
    }
}
