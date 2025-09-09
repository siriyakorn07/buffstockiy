<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    // --- โค้ดเดิมทั้งหมดไม่ถูกแตะ ---
    public function create(Request $request)
    {
        $categories = Category::all();
        $categoryId = $request->query('category_id');

        return Inertia::render('ProductCreate', [
            'categories'  => $categories,
            'category_id' => $categoryId,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'stock'       => 'required|integer|min:1',
            'unit'        => 'required|string|max:50',
            'price'       => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|max:2048',
        ]);

        $stock = (int) $request->stock;

        $imageName = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/products'), $imageName);
        }

        $product = Product::create([
            'category_id'   => $request->category_id,
            'name'          => $request->name,
            'stock'         => $stock,
            'initial_stock' => $stock,
            'unit'          => $request->unit,
            'price'         => $request->price ?? null,
            'description'   => $request->description,
            'image'         => $imageName,
        ]);

        DB::table('products')->whereNull('initial_stock')->update([
            'initial_stock' => DB::raw('stock')
        ]);

        return redirect()->route('categories.products', $product->category_id)
                         ->with('success', 'เพิ่มสินค้าเรียบร้อยแล้ว!');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();

        return Inertia::render('ProductEdit', [
            'product'    => $product,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'unit'        => 'required|string|max:50',
            'price'       => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|max:2048',
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

        if ($request->hasFile('image')) {
            if ($product->image && file_exists(public_path('images/products/' . $product->image))) {
                unlink(public_path('images/products/' . $product->image));
            }

            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/products'), $imageName);

            $updateData['image'] = $imageName;
        }

        $product->update($updateData);

        return redirect()->route('categories.products', $product->category_id)
                         ->with('success', 'แก้ไขสินค้าเรียบร้อยแล้ว!');
    }

    public function restock(Product $product)
    {
        $stockToSet = $product->initial_stock ?? $product->stock;

        $product->update(['stock' => $stockToSet]);

        return redirect()->back()->with('success', 'รีสต็อกสินค้าเรียบร้อยแล้ว!');
    }

    public function destroy(Product $product)
    {
        if ($product->image && file_exists(public_path('images/products/' . $product->image))) {
            unlink(public_path('images/products/' . $product->image));
        }

        $product->delete();

        return redirect()->back()->with('success', 'ลบสินค้าเรียบร้อยแล้ว!');
    }

    // --- ส่วนใหม่เพิ่มเข้ามาเท่านั้น ---
public function placeOrder(Request $request)
{
    $cart = $request->input('cart', []);

    if (empty($cart)) {
        return redirect()->back()->with('error', 'ตะกร้าว่าง');
    }

    $stockErrors = [];

    // ตรวจสอบ stock ของแต่ละสินค้า
    foreach ($cart as $item) {
        $product = Product::find($item['id']);

        if (!$product) {
            $stockErrors[] = "สินค้า {$item['name']} ไม่พบ";
            continue;
        }

        if ($item['quantity'] > $product->stock) {
            $stockErrors[] = "จำนวน {$product->name} ในสต็อกไม่เพียงพอ";
        }
    }

    if (!empty($stockErrors)) {
        // ส่งกลับหน้า confirm order พร้อม error array
        return redirect()->back()->with('stock_errors', $stockErrors)->withInput();
    }

    // ลด stock ของสินค้าที่สั่งซื้อ
    foreach ($cart as $item) {
        $product = Product::find($item['id']);
        if ($product) {
            $product->decrement('stock', $item['quantity']);
        }
    }

    return redirect()->route('menu.ordersuccess');
}
}
