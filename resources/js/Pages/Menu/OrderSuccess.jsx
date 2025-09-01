import { Link } from '@inertiajs/react';

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-red-800 text-white p-8">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-red-500">
          ✅ สั่งอาหารเรียบร้อย!
        </h1>
        <p className="mb-6 text-gray-300">
          ขอบคุณที่ใช้บริการ ระบบได้บันทึกคำสั่งอาหารของคุณแล้ว
        </p>

        <Link
          href="/menu"
          className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-semibold text-white shadow-lg transition"
        >
          กลับไปหน้าเมนู
        </Link>
      </div>
    </div>
  );
}
