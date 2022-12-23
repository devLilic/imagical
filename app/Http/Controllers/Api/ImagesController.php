<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImagesCollection;
use App\Http\Resources\ImagesResource;
use App\Models\Image;

class ImagesController extends Controller {

    public function index()
    {
        $limit = request('limit') ? request('limit') : 32;
        $images = ImagesResource::collection(Image::limit($limit)->latest()->get()); //;
        return [
                'images' => $images,
                'count' => Image::count()
        ];
    }
}
