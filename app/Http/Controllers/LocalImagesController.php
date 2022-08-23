<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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
        $uploaded_today = Image::whereDate('created_at', Carbon::today())->count();
        $order_number = $uploaded_today + 1;

        $date = Carbon::now()->format('Ymd');

        $uploaded_images = [];
        foreach (request('files') as $file) {
            $path = $file->storeAs('', "img_{$date}_{$order_number}." . $file->getClientOriginalExtension(), 'images');
            $uploaded_images[] = Image::create([
                'url' => $path
            ]);
            $order_number++;
        }

        return redirect('upload', 303)->with(['images' => collect($uploaded_images)->pluck('url', 'id')]);
    }
}
