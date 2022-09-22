<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{

    public function deleteImagesWithoutTags()
    {
        $images_without_tags = Image::has('tags', '=', '0')->where('created_at', '=', Carbon::today())->get();
//        dd($images_without_tags->pluck('url'));
        return Inertia::render('Settings/Settings');
    }
}
