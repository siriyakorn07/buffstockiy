<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // ฟอร์มเพิ่มสินค้า
    public function create(Request $request)
    {
        $categories = Category::all();
        $categoryId = $request->query('category_id');

        return Inertia::render('ProductCreate', [
            'categories'  => $categories,
            'category_id' => $categoryId,
        ]);
    }

    // บันทึกสินค้าใหม่
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'stock'       => 'required|integer|min:1',
            'unit'        => 'required|string|max:50',
            'price'       => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|max:2048', // 
        ]);

        $stock = (int) $request->stock;

        $imageName = null;
        if ($request->hasFile('image')) {
            $imageName = $request->file('image')->store('products', 'public'); // 
        }

        $product = Product::create([
            'category_id'   => $request->category_id,
            'name'          => $request->name,
            'stock'         => $stock,
            'initial_stock' => $stock,
            'unit'          => $request->unit,
            'price'         => $request->price ?? null,
            'description'   => $request->description,
            'image'         => $imageName, // 
        ]);

        DB::table('products')->whereNull('initial_stock')->update([
            'initial_stock' => DB::raw('stock')
        ]);

        return redirect()->route('categories.products', $product->category_id)
                         ->with('success', 'เพิ่มสินค้าเรียบร้อยแล้ว!');
    }

    // ฟอร์มแก้ไขสินค้า
    public function edit(Product $product)
    {
        $categories = Category::all();

        return Inertia::render('ProductEdit', [
            'product'    => $product,
            'categories' => $categories,
        ]);
    }

    // อัปเดตสินค้า
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'unit'        => 'required|string|max:50',
            'price'       => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|max:2048', //  เพิ่ม validation สำหรับรูป
        ]);

        $updateData = [
            'category_id' => $request->category_id,
            'name'        => $request->name,
            'unit'        => $request->unit,
            'price'       => $request->price ?? null,
            'description' => $request->description,
        ];

        if ($request->filled('stock')) {
            $updateData['stock'] = (int) $request->stock;
        }

        //  
        if ($request->hasFile('image')) {
            //
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
            $updateData['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($updateData);

        return redirect()->route('categories.products', $product->category_id)
                         ->with('success', 'แก้ไขสินค้าเรียบร้อยแล้ว!');
    }

    // รีสต็อกสินค้าให้เต็มตาม initial_stock
    public function restock(Product $product)
    {
        $product->refresh();

        $stockToSet = $product->initial_stock ?? $product->stock;

        $product->update([
            'stock' => $stockToSet,
        ]);

        return redirect()->back()->with('success', 'รีสต็อกสินค้าเรียบร้อยแล้ว!');
    }

    // ลบสินค้า
    public function destroy(Product $product)
    {
        //  
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->back()->with('success', 'ลบสินค้าเรียบร้อยแล้ว!');
    }
}
