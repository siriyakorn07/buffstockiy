<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',  // ถ้าต้องการเชื่อมกับผู้ใช้
        'status',   // pending, completed, canceled
    ];

    // ความสัมพันธ์กับ OrderItem
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
