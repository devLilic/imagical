<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model {

    use HasFactory;

    protected $fillable = ['url'];

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

//    protected function url(): Attribute
//    {
//        return Attribute::make(
//            get: fn($value) => Storage::disk('images')->url($value)
//        );
//    }
}
