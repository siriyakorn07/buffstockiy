import { Link, router } from '@inertiajs/react';

export default function Dashboard({ categories }) {
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
    'bg-gradient-to-br from-red-950 via-red-900 to-black',
    'bg-gradient-to-br from-red-900 via-red-850 to-black',
    'bg-gradient-to-br from-red-850 via-red-800 to-black',
    'bg-gradient-to-br from-red-800 via-red-750 to-black',
    'bg-gradient-to-br from-red-750 via-red-700 to-black',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-red-950 to-black text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center shadow-md border-b border-red-800">
        <button
          onClick={logout}
          className="bg-red-800 hover:bg-red-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow font-semibold transition"
        >
          ออกจากระบบ
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-red-400 text-center flex-1">
          🍲 Buffstock
        </h1>

        <Link
          href="/categories/create"
          className="bg-red-800 hover:bg-red-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow font-semibold transition"
        >
          เพิ่มหมวดหมู่
        </Link>
      </header>

      {/* Main */}
      <main className="flex-grow p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-red-300 mb-6 text-center md:text-left">
          หมวดหมู่สินค้า
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => {
            const hasLowStock = cat.products?.some((p) => p.stock < 5);
            const gradientClass = gradientClasses[index % gradientClasses.length];

            return (
              <div
                key={cat.id}
                className={`${gradientClass} p-6 rounded-2xl flex flex-col justify-between shadow-lg border border-red-800`}
              >
                {/* Low stock ⚠️ */}
                {hasLowStock && (
                  <span className="text-yellow-400 text-base mb-2 drop-shadow-lg">
                    ⚠️ สินค้าน้อย
                  </span>
                )}

                {/* ชื่อหมวดหมู่ตรงกลาง */}
                <Link
                  href={`/categories/${cat.id}/products`}
                  className="text-red-100 font-semibold text-lg text-center mb-4"
                >
                  {cat.name}
                </Link>

                {/* ปุ่มลบเล็กลง */}
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="bg-red-800 hover:bg-red-700 text-white px-2 py-1 rounded-md shadow font-semibold text-sm transition"
                >
                  ลบ
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
