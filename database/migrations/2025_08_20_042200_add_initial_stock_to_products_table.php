<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            if (!Schema::hasColumn('products', 'initial_stock')) {
                $table->integer('initial_stock')->default(0)->after('stock');
            }
            if (!Schema::hasColumn('products', 'unit')) {
                $table->string('unit', 50)->default('')->after('initial_stock');
            }
            if (!Schema::hasColumn('products', 'price')) {
                $table->integer('price')->default(0)->after('unit');
            }
            if (!Schema::hasColumn('products', 'description')) {
                $table->text('description')->nullable()->after('price');
            }
            if (!Schema::hasColumn('products', 'low_stock_threshold')) {
                $table->integer('low_stock_threshold')->default(5)->after('description');
            }
        });

        // อัปเดตสินค้าที่มีอยู่แล้ว
        if (Schema::hasTable('products')) {
            DB::table('products')->update([
                'initial_stock'       => DB::raw('stock'),
                'unit'                => DB::raw('IFNULL(unit, "")'),
                'price'               => DB::raw('IFNULL(price, 0)'),
                'low_stock_threshold' => DB::raw('IFNULL(low_stock_threshold, 5)')
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'initial_stock',
                'unit',
                'price',
                'description',
                'low_stock_threshold'
            ]);
        });
    }
};
