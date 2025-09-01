<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    // รับข้อมูลตะกร้า แล้วส่งไปหน้า ConfirmOrder
    public function confirm(Request $request)
    {
        // รับ cart จาก form
        $cart = $request->input('cart', []);

        // เก็บไว้ใน session (กันหายตอน redirect)
        session(['cart' => $cart]);

        // ส่งไปหน้า ConfirmOrder.jsx/tsx
        return Inertia::render('Menu/ConfirmOrder', [
            'cart' => $cart,
        ]);
    }

    // เมื่อยืนยันคำสั่งซื้อ
    public function store(Request $request)
    {
        $cart = session('cart', []);

        // TODO: บันทึกลงฐานข้อมูล orders + order_items
        // เช่น Order::create([...])

        // เคลียร์ session
        session()->forget('cart');

        return redirect()->route('menu.index')->with('success', 'สั่งอาหารสำเร็จแล้ว!');
    }
}
