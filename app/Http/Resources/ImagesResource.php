<?php

namespace App\Http\Resources;

use App\Models\Tag;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImagesResource extends JsonResource {

    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array|Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'url' => "/images/".$this->url,
            'isNew' => $this->isNew,
            'tags' => TagResource::collection($this->tags)
        ];
    }
}
