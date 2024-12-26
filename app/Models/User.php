<?php

namespace App\Models;

use App\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'created_by',
        'updated_by',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'role' => RoleEnum::class,
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = Str::uuid()->toString();
            }
        });
    }

    // public function projects(): BelongsToMany
    // {
    //     return $this->belongsToMany(Project::class, 'project_employees', 'user_id', 'project_id');
    // }

    public function hasRole(RoleEnum $role): bool
    {
        return $this->role === $role;
    }


    // public function assignedTasks(): HasMany
    // {
    //     return $this->hasMany(Task::class, 'assigned_to');
    // }

    // public function createdTasks(): HasMany
    // {
    //     return $this->hasMany(Task::class, 'created_by');
    // }

    // public function updatedTask(): HasMany
    // {
    //     return $this->hasMany(Task::class, 'updated_by');
    // }

    // public function taskProject(): BelongsTo
    // {
    //     return $this->belongsTo(Project::class, 'project_id');
    // }

    // public function clientProjects(): HasMany
    // {
    //     return $this->hasMany(Project::class, 'client_id');
    // }

    // public function createdProjects(): HasMany
    // {
    //     return $this->hasMany(Project::class, 'created_by');
    // }

    // public function updatedProjects(): HasMany
    // {
    //     return $this->hasMany(Project::class, 'updated_by');
    // }

    // public function createdBy(): BelongsTo
    // {
    //     return $this->belongsTo(User::class, 'created_by');
    // }

    // public function updatedBy(): BelongsTo
    // {
    //     return $this->belongsTo(User::class, 'updated_by');
    // }

    // public function clientDetail(): HasOne
    // {
    //     return $this->hasOne(ClientDetail::class, 'user_id', 'id');
    // }
}