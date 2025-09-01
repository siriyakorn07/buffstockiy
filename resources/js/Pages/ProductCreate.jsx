import { useForm, Link } from '@inertiajs/react';

export default function ProductCreate({ categories }) {
  const { data, setData, post, processing, errors } = useForm({
    category_id: '',
    name: '',
    stock: '',
    initial_stock: '',
    unit: '',
    price: '',
    description: '',
    low_stock_threshold: 5,
    image: null, 
  });

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('category_id', data.category_id);
    formData.append('name', data.name);
    formData.append('stock', parseInt(data.stock, 10) || 1);
    formData.append('initial_stock', parseInt(data.initial_stock, 10) || parseInt(data.stock, 10) || 1);
    formData.append('unit', data.unit);
    formData.append('price', parseInt(data.price, 10) || 0);
    formData.append('description', data.description);
    formData.append('low_stock_threshold', parseInt(data.low_stock_threshold, 10) || 5);
    if (data.image) formData.append('image', data.image);

    post('/products', {
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-black to-red-800 p-6">
      <form
        onSubmit={submit}
        className="bg-gradient-to-b from-gray-900 via-red-900 to-red-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-red-500 text-center tracking-wide">
          เพิ่มเมนู
        </h1>

        {/* เลือกหมวดหมู่ */}
        <div className="mb-4">
          <select
            value={data.category_id}
            onChange={(e) => setData('category_id', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-gray-800 text-white focus:ring-red-400 focus:border-red-400"
          >
            <option value="">-- เลือกหมวดหมู่ --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-400 mt-1 text-sm">{errors.category_id}</p>
          )}
        </div>

        {/* ชื่อสินค้า */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-red-400 focus:border-red-400"
          />
          {errors.name && <p className="text-red-400 mt-1 text-sm">{errors.name}</p>}
        </div>

        {/* จำนวน */}
        <div className="mb-4 relative">
          <input
            type="number"
            placeholder="จำนวนสินค้า"
            value={data.stock}
            onChange={(e) => setData('stock', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-red-400 focus:border-red-400"
          />
          <span className="absolute top-1 right-2 text-xl animate-pulse">⚡</span>
          {errors.stock && <p className="text-red-400 mt-1 text-sm">{errors.stock}</p>}
        </div>

        {/* จำนวนเริ่มต้น */}
        <div className="mb-4 relative">
          <input
            type="number"
            placeholder="จำนวนเริ่มต้น (รีสต็อก)"
            value={data.initial_stock}
            onChange={(e) => setData('initial_stock', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-red-400 focus:border-red-400"
          />
          {errors.initial_stock && (
            <p className="text-red-400 mt-1 text-sm">{errors.initial_stock}</p>
          )}
        </div>

        {/* หน่วย */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="หน่วย (เช่น จาน, ถาด)"
            value={data.unit}
            onChange={(e) => setData('unit', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-red-400 focus:border-red-400"
          />
          {errors.unit && <p className="text-red-400 mt-1 text-sm">{errors.unit}</p>}
        </div>

        {/* ราคา */}
        <div className="mb-4">
          <input
            type="number"
            placeholder="ราคา (ไม่บังคับ)"
            value={data.price}
            onChange={(e) => setData('price', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-red-400 focus:border-red-400"
          />
          {errors.price && <p className="text-red-400 mt-1 text-sm">{errors.price}</p>}
        </div>

        {/* รูปภาพ */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setData('image', e.target.files[0])}
            className="w-full p-3 rounded-lg border border-red-600 bg-gray-800 text-white focus:ring-red-400 focus:border-red-400"
          />
          {errors.image && <p className="text-red-400 mt-1 text-sm">{errors.image}</p>}
        </div>

        {/* คำอธิบาย */}
        <div className="mb-6">
          <textarea
            placeholder="คำอธิบาย (ไม่บังคับ)"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-red-400 focus:border-red-400"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-400 mt-1 text-sm">{errors.description}</p>
          )}
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-between items-center">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-800 text-red-500 hover:bg-red-700 hover:text-white rounded-lg shadow font-semibold transition"
          >
            กลับหน้า Dashboard
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
