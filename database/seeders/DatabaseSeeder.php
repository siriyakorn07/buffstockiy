<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // เรียก Seeder อื่น ๆ ที่เราสร้างไว้
        $this->call([
            CategorySeeder::class,
        ]);
    }
}
