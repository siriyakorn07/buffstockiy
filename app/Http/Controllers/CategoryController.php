<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    //  Dashboard (หมวดหมู่ทั้งหมด + เช็คของใกล้หมด)
    public function index()
    {
        $categories = Category::with('products')->get();

        // loop เช็คสินค้าที่ใกล้หมดของแต่ละหมวด
        $categories = $categories->map(function ($category) {
            $lowStockProducts = $category->products->filter(function ($product) {
                return $product->stock <= $product->low_stock_threshold;
            });

            // เพิ่ม field ไว้โชว์ที่ Dashboard
            $category->low_stock_count = $lowStockProducts->count();
            return $category;
        });

        return Inertia::render('Dashboard', [
            'categories' => $categories
        ]);
    }

    //  แสดงสินค้าของหมวดหมู่
    public function show(Category $category)
    {
        $products = $category->products ?? collect([]);

        $lowStockProducts = $products->filter(function ($product) {
            return $product->stock <= $product->low_stock_threshold;
        });

        return Inertia::render('CategoryDetail', [
            'category' => $category,
            'products' => $products,
            'lowStockProducts' => $lowStockProducts,
        ]);
    }

    //  แสดงฟอร์มสร้างหมวดหมู่
    public function create()
    {
        return Inertia::render('CategoryCreate');
    }

    //  บันทึกหมวดหมู่ใหม่
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        Category::create([
            'name' => $request->name,
        ]);

        return redirect()->route('dashboard')->with('success', 'สร้างหมวดหมู่เรียบร้อยแล้ว');
    }

    // ลบหมวดหมู่
    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('dashboard')->with('success', 'ลบหมวดหมู่เรียบร้อยแล้ว');
    }
}
