import { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Dashboard({ categories }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    router.post('/logout');
  };

  const handleDelete = (id) => {
    if (confirm('คุณแน่ใจว่าต้องการลบหมวดหมู่นี้?')) {
      router.delete(`/categories/${id}`);
    }
  };

  const gradientClasses = [
    'bg-gradient-to-br from-red-600 via-red-400 to-white',
    'bg-gradient-to-br from-red-500 via-red-300 to-white',
    'bg-gradient-to-br from-red-700 via-red-500 to-white',
    'bg-gradient-to-br from-red-800 via-red-600 to-white',
    'bg-gradient-to-br from-red-900 via-red-700 to-white',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-100 via-white to-red-100 text-gray-900 p-4 sm:p-6">
      {/* Header */}
      <header className="relative mb-6 flex items-center justify-between">
        {/* ปุ่มออกจากระบบ Desktop */}
        <div className="hidden md:block">
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg shadow-md font-semibold text-white"
          >
            ออกจากระบบ
          </button>
        </div>

        {/* ชื่อระบบ */}
        <div className="text-center flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-red-700 drop-shadow-md mb-1">
            📦 Buffstock
          </h1>
          <p className="text-red-600 font-semibold drop-shadow-sm text-sm sm:text-base">
                 สต็อกสินค้า
          </p>
        </div>

        {/* ปุ่มเพิ่มหมวดหมู่ Desktop */}
        <div className="hidden md:block">
          <Link
            href="/categories/create"
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg shadow-md font-semibold text-white"
          >
            เพิ่มหมวดหมู่
          </Link>
        </div>

        {/* Hamburger สำหรับมือถือ */}
        <button
          className="md:hidden px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </header>

      {/* เมนูมือถือ */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-2 mb-4">
          <button
            onClick={logout}
            className="flex justify-center items-center px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg shadow-md font-semibold text-white"
          >
            ออกจากระบบ
          </button>
          <Link
            href="/categories/create"
            className="flex justify-center items-center px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg shadow-md font-semibold text-white"
          >
            เพิ่มหมวดหมู่
          </Link>
        </div>
      )}

      {/* หัวข้อหมวดหมู่ */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 drop-shadow-sm mb-4 sm:mb-6 text-center md:text-left">
        หมวดหมู่สินค้า
      </h2>

      {/* Grid หมวดหมู่ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, index) => {
          const hasLowStock = cat.products?.some((p) => p.stock < 5);
          const gradientClass = gradientClasses[index % gradientClasses.length];

          return (
            <div
              key={cat.id}
              className={`${gradientClass} rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-xl border border-red-400 transform hover:scale-105 transition-transform duration-300`}
            >
              {hasLowStock && (
                <span className="text-red-700 font-semibold text-xs sm:text-sm mb-2 sm:mb-3 drop-shadow-md">
                  ⚠️ สินค้าน้อย
                </span>
              )}

              <Link
                href={`/categories/${cat.id}/products`}
                className="font-bold text-lg sm:text-xl text-center mb-3 sm:mb-5 hover:text-red-800 transition-colors duration-300"
              >
                {cat.name}
              </Link>

              <button
                onClick={() => handleDelete(cat.id)}
                className="px-2 sm:px-3 py-1 bg-red-600 hover:bg-red-500 rounded-md shadow-md font-semibold text-xs sm:text-sm transition duration-300 text-white"
              >
                ลบ
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
