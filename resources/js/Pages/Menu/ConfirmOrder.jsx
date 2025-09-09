import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

export default function ConfirmOrder({ cart, allCategories, stock_errors }) {
  const [localCart, setLocalCart] = useState(cart || []);
  const [submitting, setSubmitting] = useState(false);

  const getProduct = (id) => {
    for (const cat of allCategories) {
      const prod = cat.products.find((p) => p.id === id);
      if (prod) return prod;
    }
    return null;
  };

  const increase = (id) => {
    setLocalCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decrease = (id) => {
    setLocalCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const placeOrder = () => {
    if (!localCart || localCart.length === 0) return;
    setSubmitting(true);
    Inertia.post("/menu/place-order", { cart: localCart }, { onFinish: () => setSubmitting(false) });
  };

  if (!localCart || localCart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 text-gray-900 space-y-6">
        <h1 className="text-2xl font-bold">คุณยังไม่มีสินค้าในตะกร้า</h1>
        <Link
          href="/menu"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition font-semibold text-white shadow"
        >
          กลับไปเลือกเมนูต่อ
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-red-100 via-white to-red-200 text-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-600 drop-shadow">ยืนยันออเดอร์</h1>

      <div className="space-y-6">
        {localCart.map((item, i) => {
          const product = getProduct(item.id);
          if (!product) return null;

          // ตรวจสอบ stock error สำหรับสินค้านี้
          const hasStockError = stock_errors && stock_errors[item.id];

          return (
            <div
              key={i}
              className="flex flex-col justify-between bg-white shadow rounded-lg p-4 border border-red-200"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{product.name}</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => decrease(item.id)}
                    className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition font-bold text-white"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increase(item.id)}
                    className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition font-bold text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ข้อความ stock error */}
              {hasStockError && (
                <p className="text-red-600 text-sm mt-1">{hasStockError}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={placeOrder}
          disabled={submitting}
          className={`px-10 py-3 rounded-lg font-bold text-white transition shadow-lg ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400"
          }`}
        >
          {submitting
            ? "กำลังสั่ง..."
            : `ยืนยันคำสั่ง (${localCart.reduce((total, i) => total + i.quantity, 0)})`}
        </button>
      </div>
    </div>
  );
}
