<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    // กำหนดฟิลด์ที่สามารถ mass assign ได้
    protected $fillable = ['name'];

    // Relation กับ Product
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
