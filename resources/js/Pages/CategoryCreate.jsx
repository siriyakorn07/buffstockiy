import { useForm, Link } from '@inertiajs/react';

export default function CategoryCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/categories'); // route categories.store
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-red-900 to-black p-6 flex items-center justify-center">
      {/* ฟอร์มเพิ่มหมวดหมู่ */}
      <form
        onSubmit={submit}
        className="bg-gradient-to-b from-gray-900 via-red-900 to-red-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-red-400 text-center tracking-wide">
          เพิ่มหมวดหมู่
        </h1>

        <div className="mb-6">
          <input
            type="text"
            value={data.name}
            placeholder="ชื่อหมวดหมู่"
            onChange={(e) => setData('name', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-red-400 focus:border-red-400"
          />
          {errors.name && (
            <p className="text-red-400 mt-1 text-sm">{errors.name}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-800 text-red-500 hover:bg-red-700 hover:text-white rounded-lg shadow font-semibold transition"
          >
            ย้อนกลับ
          </Link>

          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow font-semibold transition"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
}
