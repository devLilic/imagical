<?php

namespace App\Http\Resources;

use App\Models\Image;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticlesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'tehno_title' => $this->tehno_title,
            'slugs' => explode('||', $this->slugs),
            'intro' => $this->intro,
            'article_type' => $this->article_type,
            'image' => $this->image_id ? Image::where('id', $this->image_id)->with('tags')->first(['id', 'url']) : null
        ];
    }
}
