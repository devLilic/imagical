<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Article extends Model {

    use HasFactory;

    protected $guarded = [];

    public function playlist(): BelongsTo
    {
        return $this->belongsTo(Playlist::class);
    }
}
