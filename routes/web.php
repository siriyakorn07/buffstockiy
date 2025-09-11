<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MenuController;

// หน้าแรก redirect ไป login
Route::get('/', function () {
    return redirect()->route('login');
});

// ===========================
// Login / Logout
// ===========================
Route::get('/login', [AuthController::class, 'showLogin'])
    ->name('login')
    ->middleware('guest');

Route::post('/login', [AuthController::class, 'login'])
    ->middleware('guest');

Route::post('/logout', [AuthController::class, 'logout'])
    ->name('logout')
    ->middleware('auth');

// ===========================
// routes (Dashboard, Category, Product)
// ===========================
Route::middleware(['auth'])->group(function () {

    // Dashboard
    Route::get('/dashboard', function () {
        $categories = Category::all();
        return Inertia::render('Dashboard', [
            'categories' => $categories
        ]);
    })->name('dashboard');

    // Category
    Route::prefix('categories')->group(function () {
        Route::get('create', [CategoryController::class, 'create'])->name('categories.create');
        Route::post('/', [CategoryController::class, 'store'])->name('categories.store');
        Route::get('{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
        Route::put('{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
        // แก้ตรงนี้: ใช้ {category} สำหรับ show แทน {category}/products
        Route::get('{category}', [CategoryController::class, 'show'])->name('categories.show');
    });

    // Product
    Route::prefix('products')->group(function () {
        Route::get('create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/', [ProductController::class, 'store'])->name('products.store');
        Route::get('{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('{product}', [ProductController::class, 'destroy'])->name('products.destroy');
        Route::post('{product}/restock', [ProductController::class, 'restock'])->name('products.restock');
    });
});

// ===========================
// User Menu routes
// ===========================

// หน้า QR Scan (หน้าแรก)
Route::get('/scan-qr', function () {
    return Inertia::render('ScanQRCode');
})->name('scan-qr');

// หน้าเมนู
Route::get('/menu', [MenuController::class, 'index'])
    ->name('menu.index');

// POST ตรวจสอบ stock และ confirm order
Route::post('/menu/confirm', [MenuController::class, 'confirmOrderPost'])
    ->name('menu.confirm.post');

// GET แสดง confirm order
Route::get('/menu/confirm', [MenuController::class, 'confirmOrder'])
    ->name('menu.confirm');

// POST ยืนยันสั่งอาหาร (ตรวจสอบ stock อีกครั้งก่อนบันทึก)
Route::post('/menu/place-order', [MenuController::class, 'placeOrder'])
    ->name('menu.place-order');

// หน้า order success
Route::get('/menu/order-success', [MenuController::class, 'orderSuccess'])
    ->name('menu.ordersuccess');
