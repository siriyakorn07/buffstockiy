<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['เมนูเนื้อสัตว์', 'เมนูผัก', 'เมนูแป้ง', 'เมนูทะเล', 'เมนูทานเล่น'];

        foreach ($categories as $name) {
            Category::create(['name' => $name]);
        }
    }
}
