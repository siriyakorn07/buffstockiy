import { Link } from '@inertiajs/react';

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 text-gray-900 p-8">
      <div className="bg-gradient-to-b from-white to-red-50 p-10 rounded-2xl shadow-2xl text-center border border-red-200">
        <h1 className="text-4xl font-extrabold mb-6 text-red-600 drop-shadow">
          ✅ สั่งอาหารเรียบร้อย!
        </h1>
        <p className="mb-6 text-gray-700">
          ขอบคุณที่ใช้บริการ ระบบได้บันทึกคำสั่งอาหารของคุณแล้ว
        </p>

        <Link
          href="/menu"
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-xl font-semibold text-white shadow-lg transition"
        >
          กลับไปหน้าเมนู
        </Link>
      </div>
    </div>
  );
}
