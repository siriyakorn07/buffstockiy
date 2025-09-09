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

        // ตรวจสอบ stock ของแต่ละสินค้า
        $stock_errors = [];
        foreach ($cart as $item) {
            $product = Product::find($item['id']);
            if ($product && $item['quantity'] > $product->stock) {
                $stock_errors[$item['id']] = "จำนวนสินค้าไม่เพียงพอ กรุณารอสักครู่";
            }
        }

        return Inertia::render('Menu/ConfirmOrder', [
            'cart' => $cart,
            'allCategories' => $categories,
            'stock_errors' => $stock_errors, // ส่งเป็น array key=id ของสินค้า
        ]);
    }

    public function placeOrder(Request $request)
    {
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

            if (!$product || $quantity <= 0) {
                continue;
            }

            // ลด stock เท่าที่มี ไม่บล็อก
            $quantityToDeduct = min($quantity, $product->stock);
            $product->decrement('stock', $quantityToDeduct);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
            ]);
        }

        // ล้าง session cart
        session()->forget('cart');

        return redirect()->route('menu.ordersuccess');
    }

    public function orderSuccess()
    {
        return Inertia::render('Menu/OrderSuccess');
    }
}
