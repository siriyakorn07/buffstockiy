<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->integer('stock')->default(0);
            $table->integer('initial_stock')->default(0);
            $table->string('unit')->default('');               // ต้องมีค่าเริ่มต้น
            $table->integer('price')->default(0);
            $table->text('description')->nullable();
            $table->integer('low_stock_threshold')->default(5);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
