<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LocalImagesController extends Controller {

    public function index()
    {
        $take = request('takeImages');
        $images = !!$take ?
            Image::with('tags')->take((int) $take)->get() :
            Image::with('tags')->latest()->get();
        $images->map(fn($image) => $image->url = asset("images/$image->url"));

        return $images;
    }

    public function relevant(Request $request)
    {
        $slug_words = explode(" ", trim($request->search));
        $suggested_images = collect();
        if (count($slug_words) === 2) {
            $tag = Tag::where('title', strtolower(implode('-', $slug_words)))->first();
            if ($tag) {
                $images = $tag->images()->with('tags')->get();
                if ($images->count()) {
                    $images->map(function ($image) use ($suggested_images)
                    {
                        $image->url = asset("images/$image->url");
                        $suggested_images->push($image);
                    });
                }
            }
        }
        if (count($slug_words) < 4) {
            foreach ($slug_words as $word) {
                $tag = Tag::where('title', strtolower($word))->first();
                if ($tag) {
                    $images = $tag->images()->with('tags')->get();
                    if ($images->count()) {
                        $images->map(function ($image) use ($suggested_images)
                        {
                            $image->url = asset("images/$image->url");
                            if (!$suggested_images->pluck('url')->contains($image->url)) {
                                $suggested_images->push($image);
                            }
                        });
                    }
                }
            }
        }

        return $suggested_images;
    }


    public function search(Request $request)
    {
        if ($request->search !== "") {
            $tags = Tag::where('title', 'like', "%$request->search%")->get();
            $images = collect();
            foreach ($tags as $tag) {
                $tag->images()->with('tags')->get()->map(function ($image) use ($images)
                {
                    if (!$images->contains($image)) {
                        $image->url = asset("images/$image->url");
                        $images->add($image);
                    }
                });
            }
        } else {
            $images = Image::with('tags')->take(20)->get();
            $images->map(fn($image) => $image->url = asset("images/$image->url"));
        }

        return $images;
    }

    public function create()
    {
        $images = Image::where('isNew', true)->whereDate('created_at', Carbon::today())->orderBy('created_at', 'DESC')->get();

        $uploaded_today = [];
        foreach ($images as $image) {
            $item['id'] = $image->id;
            $item['url'] = Storage::disk('images')->url($image->url);
            $item['tags'] = $image->tags->implode(", ");
            $uploaded_today[] = $item;
        }

        return Inertia::render('Images/Upload', [
            'uploaded' => $uploaded_today,
        ]);
    }

    public function storeTags()
    {
        $images = collect(json_decode(request('images')));
        $images->map(function ($image)
        {
            $localImage = Image::find($image->id);
            $tags = explode(",", $image->tags);
            foreach ($tags as $tag) {
                $localTag = Tag::firstOrCreate(['title' => trim($tag)]);
                $localImage->tags()->attach($localTag);
            }
            $localImage->isNew = false;
            $localImage->save();
        });
    }

    public function store()
    {
        $uploaded_today = Image::whereDate('created_at', Carbon::today())->count();
        $order_number = $uploaded_today + 1;

        $date = Carbon::now()->format('Ymd');

        $uploaded_now = collect();
        foreach (request('files') as $file) {
            do {
                $fileName = "img_{$date}_{$order_number}." . $file->getClientOriginalExtension();
                $order_number++;
            } while (Image::where('url', $fileName)->count() !== 0);

            $path = $file->storeAs('', $fileName, 'images');

            $image = Image::create([
                'url' => $path
            ]);

            $uploaded_now->push([
                'id' => $image->id,
                'url' => asset("images/$image->url")
            ]);
        }

//        $today_images = Image::whereDate('created_at', Carbon::today())->get();
//        $result = collect();
//        $today_images->map(function($image){
//            $image->url = asset("images/$image->url");
//        });
//        dd($today_images)

//        return $today_images;
        return $uploaded_now;
//        return redirect()->route('upload-images');
    }

    public function destroy(Request $request)
    {
        try {
            $image = Image::where('id', $request->image_id)->firstOrFail();
            $id = $image->id;
            Storage::disk('images')->delete($image->url);
            $image->delete();
            if ($id !== 0) {
                return ['image_id' => $id];
            }
        } catch (ModelNotFoundException $e) {
            return ['error' => 'File not found'];
        }
    }

    public function allImages()
    {
        $images = Image::with('tags')->get();
        $images->map(fn($image) => $image->url = asset("images/$image->url"));

        return Inertia::render("Images/AllImages", [
            'images' => $images
        ]);
    }
}
