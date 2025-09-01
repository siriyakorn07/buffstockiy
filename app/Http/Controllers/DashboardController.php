<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // ดึงหมวดหมู่พร้อมสินค้าทั้งหมด
        $categories = Category::with('products')->get();

        // เพิ่ม low_stock_products ให้แต่ละหมวด
        $categories->transform(function ($category) {
            $category->low_stock_products = $category->products->filter(function ($product) {
                return $product->stock <= $product->low_stock_threshold;
            })->values(); // reset index
            return $category;
        });

        return Inertia::render('Dashboard', [
            'categories' => $categories
        ]);
    }
}
