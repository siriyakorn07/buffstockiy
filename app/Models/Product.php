<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // เพิ่ม initial_stock และ low_stock_threshold เข้าไปใน $fillable
    protected $fillable = [
        'category_id',
        'name',
        'stock',
        'initial_stock',       // จำนวนตั้งต้นสำหรับรีสต็อก
        'low_stock_threshold', // จำนวนต่ำสุดสำหรับแจ้งเตือน Low Stock
        'unit',
        'price',
        'description',
        'image',
    ];
}
