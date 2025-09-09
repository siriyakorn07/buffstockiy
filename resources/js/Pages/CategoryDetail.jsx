import { Link, useForm } from '@inertiajs/react';

export default function CategoryDetail({ category, products }) {
  const { delete: destroy, post } = useForm();

  const handleDelete = (id) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบเมนูนี้?')) {
      destroy(`/products/${id}`);
    }
  };

  const handleRestock = (id) => {
    post(`/products/${id}/restock`, {
      onSuccess: () => {
        alert('รีสต็อกสินค้าเรียบร้อยแล้ว!');
      },
    });
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-white via-red-100 to-red-800 text-gray-900">

      {/* ปุ่มกลับไป Dashboard และเพิ่มเมนู */}
      <div className="mb-4 flex justify-between items-center">
        <Link
          href="/dashboard"
          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow font-semibold text-xs transition transform hover:scale-105"
        >
          กลับไปหน้า Dashboard
        </Link>

        <Link
          href={`/products/create?category_id=${category.id}`}
          className="px-3 py-1 bg-red-400 hover:bg-red-300 text-white rounded-lg shadow font-semibold text-xs transition transform hover:scale-105"
        >
          เพิ่มเมนู
        </Link>
      </div>

      <h1 className="text-2xl font-extrabold mb-4 text-red-700 border-b border-red-500 pb-1">
        {category.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {products.map((product) => {
          const isLowStock = product.stock <= (product.low_stock_threshold ?? 5);

          return (
            <div
              key={product.id}
              className="bg-gradient-to-br from-white via-red-200 to-red-500 p-3 rounded-lg shadow flex flex-col justify-between transition transform hover:scale-105 relative text-gray-900"
            >
              <div>
                <h2 className="font-bold text-lg mb-1 text-red-700">{product.name}</h2>
                <p className="text-gray-800 text-xs mb-1">
                  จำนวน: {product.stock} {product.unit}{" "}
                  {isLowStock && (
                    <span className="inline-block ml-1 px-1 py-0.5 text-[10px] font-bold text-white bg-red-600 rounded-full">
                      ⚠️ Low
                    </span>
                  )}
                </p>
                {product.price && (
                  <p className="text-gray-800 text-xs mb-1">
                    ราคา: {product.price} บาท
                  </p>
                )}
                {product.description && (
                  <p className="text-gray-700 text-xs">{product.description}</p>
                )}
              </div>

              {/* ปุ่มแก้ไข, ลบ, รีสต็อก */}
              <div className="mt-2 flex justify-end gap-1">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="px-2 py-1 bg-yellow-600 hover:bg-yellow-500 rounded shadow font-semibold text-white text-xs text-center transition transform hover:scale-105"
                >
                  แก้ไข
                </Link>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded shadow font-semibold text-white text-xs transition transform hover:scale-105"
                >
                  ลบ
                </button>

                <button
                  onClick={() => handleRestock(product.id)}
                  className="px-2 py-1 bg-red-400 hover:bg-red-300 rounded shadow font-semibold text-white text-xs transition transform hover:scale-105"
                >
                  รีสต็อก
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
