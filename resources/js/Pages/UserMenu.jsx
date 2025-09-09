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

    // ส่งไป confirm page โดยไม่ตรวจสอบ stock ที่นี่
    Inertia.post("/menu/confirm", { cart });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-white via-red-50 to-red-100 text-gray-900">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-500 to-red-400 drop-shadow-md">
        🍽️ เมนู
      </h1>

      {categories.map((category) => (
        <div key={category.id} className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-b-2 border-red-600 inline-block pb-1 text-red-700">
            {category.name}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-8">
            {category.products.map((product) => {
              const inCart =
                cart.find((item) => item.id === product.id)?.quantity || 0;
              return (
                <div
                  key={product.id}
                  className="bg-gradient-to-br from-red-50 via-white to-red-50 p-3 sm:p-4 md:p-5 rounded-2xl shadow-md border border-red-300 hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
                >
                  {product.image && (
                    <img
                      src={`/images/products/${product.image}`}
                      alt={product.name}
                      className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-xl mb-3 sm:mb-4 border border-red-200"
                    />
                  )}

                  <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-red-700 truncate">
                    {product.name}
                  </h3>

                  {product.description && (
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3">
                      {product.description}
                    </p>
                  )}

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 w-full py-1.5 sm:py-2 text-xs sm:text-sm md:text-base rounded-xl font-medium text-white transition bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:from-red-500 hover:via-red-400 hover:to-red-300 shadow"
                  >
                    🛒 ใส่ตะกร้า{inCart > 0 ? ` (${inCart})` : ""}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
          <button
            onClick={goToConfirm}
            className="px-4 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:from-red-500 hover:via-red-400 hover:to-red-300 rounded-2xl font-semibold text-white shadow-lg transition text-sm sm:text-base"
          >
            คำสั่งซื้อ ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>
      )}
    </div>
  );
}
