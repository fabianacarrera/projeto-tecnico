<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    protected $fillable = [
        'user_id',
        'nome',
        'tipo',
        'idade_anos',
        'idade_meses',
        'sexo',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
