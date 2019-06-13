<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamUser extends Model
{
    protected $fillable = [
        'member_id', 'owner_id', 'team_id', 'is_admin'
    ];

    public function team()
    {
        return $this->belongsTo(Team::class, "team_id");
    }
}
