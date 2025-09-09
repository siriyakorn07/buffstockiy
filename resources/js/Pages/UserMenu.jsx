import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function UserMenu({ categories }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: product.id, name: product.name, quantity: 1 }];
    });
  };

  const goToConfirm = () => {
    if (cart.length === 0) return;
    Inertia.post("/menu/confirm", { cart });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-red-100 via-white to-red-200 text-gray-900">
      <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-700 via-red-500 to-red-400 drop-shadow-md">
        🍽️ เมนู
      </h1>

      {categories.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-red-600 inline-block pb-1 text-red-700">
            {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {category.products.map((product) => {
              const inCart =
                cart.find((item) => item.id === product.id)?.quantity || 0;

              return (
                <div
                  key={product.id}
                  className="bg-gradient-to-br from-white to-red-50 p-4 rounded-xl shadow-md border border-red-300 hover:shadow-red-400/40 transition transform hover:-translate-y-0.5"
                >
                  {/* แสดงรูปภาพ */}
                  {product.image && (
                    <img
                      src={`/storage/products/${product.image}`}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg mb-2 border border-red-200"
                    />
                  )}
                  <h3 className="font-bold text-lg mb-1 text-red-700">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                  )}
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-3 w-full py-1.5 rounded-lg font-semibold text-white transition bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow"
                  >
                    🛒 ใส่ตะกร้า
                    {inCart > 0 ? ` (${inCart})` : ""}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={goToConfirm}
            className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-lg font-semibold text-white shadow transition text-sm"
          >
            คำสั่งซื้อ (
            {cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>
      )}
    </div>
  );
}
