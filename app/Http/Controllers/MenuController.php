<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    public function index()
    {
        $categories = Category::with('products')->get();

        return Inertia::render('UserMenu', [
            'categories' => $categories
        ]);
    }

    // POST จากหน้า UserMenu ไป ConfirmOrder
    public function confirmOrderPost(Request $request)
    {
        $cart = $request->input('cart', []);
        if (empty($cart)) {
            $categories = Category::with('products')->get();
            return Inertia::render('UserMenu', [
                'categories' => $categories,
                'error' => 'ไม่มีสินค้าในตะกร้า',
            ]);
        }

        session(['cart' => $cart]);

        // Redirect ไปหน้า confirm
        return Inertia::location(route('menu.confirm'));
    }

    public function confirmOrder()
    {
        $cart = session('cart', []);
        $categories = Category::with('products')->get();

        return Inertia::render('Menu/ConfirmOrder', [
            'cart' => $cart,
            'allCategories' => $categories,
        ]);
    }

    public function placeOrder(Request $request)
    {
        // ใช้จำนวนจาก POST แทน session
        $cart = $request->input('cart', []);
        if (empty($cart)) {
            return redirect()->route('menu.index')->with('error', 'ไม่มีสินค้าในตะกร้า');
        }

        $order = Order::create([
            'user_id' => Auth::id(),
            'status' => 'pending'
        ]);

        foreach ($cart as $item) {
            $product = Product::find($item['id']);
            $quantity = intval($item['quantity'] ?? 0);

            if (!$product || $quantity <= 0 || $product->stock < $quantity) {
                continue;
            }

            // ลด stock ตามจำนวนล่าสุด
            $product->decrement('stock', $quantity);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
            ]);
        }

        // ล้าง session cart
        session()->forget('cart');

        // redirect ไปหน้า success
        return redirect()->route('menu.ordersuccess');
    }

    public function orderSuccess()
    {
        return Inertia::render('Menu/OrderSuccess');
    }
}
