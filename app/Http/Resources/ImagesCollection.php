<?php

namespace App\Http\Resources;

use App\Models\Image;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ImagesCollection extends ResourceCollection {

    /**
     * Transform the resource collection into an array.
     *
     * @param Request $request
     * @return array|Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'images' => $this->collection,
            'count' => Image::count()
        ];
    }
}
