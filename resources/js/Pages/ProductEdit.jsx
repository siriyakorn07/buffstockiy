import { useForm, Link } from '@inertiajs/react';

export default function ProductEdit({ product, categories }) {
  const { data, setData, put, processing, errors } = useForm({
    category_id: product.category_id || '',
    name: product.name || '',
    stock: product.stock ?? 0,
    initial_stock: product.initial_stock ?? product.stock,
    low_stock_threshold: product.low_stock_threshold ?? 5,
    unit: product.unit || '',
    price: product.price ?? 0,
    description: product.description || '',
    image: null,
  });

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('category_id', data.category_id);
    formData.append('name', data.name);
    formData.append('stock', parseInt(data.stock, 10));
    formData.append('initial_stock', parseInt(data.initial_stock, 10));
    formData.append('low_stock_threshold', parseInt(data.low_stock_threshold, 10));
    formData.append('unit', data.unit);
    formData.append('price', data.price ? parseInt(data.price, 10) : 0);
    formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    put(`/products/${product.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-red-900 via-white to-red-800 p-6">
      <form
        onSubmit={submit}
        className="bg-gradient-to-b from-red-800 via-white to-red-900 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-red-600 text-center tracking-wide drop-shadow-md">
          แก้ไขเมนู
        </h1>

        {/* เลือกหมวดหมู่ */}
        <div className="mb-4">
          <select
            value={data.category_id}
            onChange={(e) => setData('category_id', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-white text-red-800 focus:ring-red-400 focus:border-red-400"
          >
            <option value="">-- เลือกหมวดหมู่ --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500 mt-1 text-sm">{errors.category_id}</p>
          )}
        </div>

        {/* ชื่อสินค้า */}
        <div className="mb-4">
          <input
            type="text"
            value={data.name}
            placeholder="ชื่อเมนู"
            onChange={(e) => setData('name', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-white text-red-800 placeholder-red-400 focus:ring-red-400 focus:border-red-400"
          />
          {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
        </div>

        {/* จำนวน */}
        <div className="mb-4">
          <input
            type="number"
            value={data.stock}
            placeholder="จำนวน"
            onChange={(e) => setData('stock', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-white text-red-800 placeholder-red-400 focus:ring-red-400 focus:border-red-400"
          />
          {errors.stock && <p className="text-red-500 mt-1 text-sm">{errors.stock}</p>}
        </div>

        {/* จำนวนเริ่มต้น */}
        <div className="mb-4">
          <input
            type="number"
            value={data.initial_stock}
            placeholder="จำนวนเริ่มต้น (รีสต็อก)"
            onChange={(e) => setData('initial_stock', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-white text-red-800 placeholder-red-400 focus:ring-red-400 focus:border-red-400"
          />
          {errors.initial_stock && (
            <p className="text-red-500 mt-1 text-sm">{errors.initial_stock}</p>
          )}
        </div>

        {/* จำนวนขั้นต่ำเตือน */}
        <div className="mb-4">
          <input
            type="number"
            value={data.low_stock_threshold}
            placeholder="จำนวนขั้นต่ำเตือน"
            onChange={(e) => setData('low_stock_threshold', e.target.value)}
            className="w-full p-3 rounded-lg border border-yellow-600 bg-white text-red-800 placeholder-yellow-400 focus:ring-yellow-400 focus:border-yellow-400"
          />
          {errors.low_stock_threshold && (
            <p className="text-yellow-500 mt-1 text-sm">{errors.low_stock_threshold}</p>
          )}
        </div>

        {/* หน่วย */}
        <div className="mb-4">
          <input
            type="text"
            value={data.unit}
            placeholder="หน่วย (เช่น จาน, ถ้วย)"
            onChange={(e) => setData('unit', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-white text-red-800 placeholder-red-400 focus:ring-red-400 focus:border-red-400"
          />
          {errors.unit && <p className="text-red-500 mt-1 text-sm">{errors.unit}</p>}
        </div>

        {/* ราคา */}
        <div className="mb-4">
          <input
            type="number"
            value={data.price}
            placeholder="ราคา (ไม่ใส่ก็ได้)"
            onChange={(e) => setData('price', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-white text-red-800 placeholder-red-400 focus:ring-red-400 focus:border-red-400"
          />
          {errors.price && <p className="text-red-500 mt-1 text-sm">{errors.price}</p>}
        </div>

        {/* รูปภาพ */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setData('image', e.target.files[0])}
            className="w-full p-3 rounded-lg border border-red-600 bg-white text-red-800 focus:ring-red-400 focus:border-red-400"
          />
          {product.image && (
            <img
              src={`/storage/products/${product.image}`}
              alt={product.name}
              className="mt-2 w-full h-40 object-cover rounded-lg"
            />
          )}
          {errors.image && <p className="text-red-500 mt-1 text-sm">{errors.image}</p>}
        </div>

        {/* คำอธิบาย */}
        <div className="mb-6">
          <textarea
            value={data.description}
            placeholder="คำอธิบาย"
            onChange={(e) => setData('description', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-white text-red-800 placeholder-red-400 focus:ring-red-400 focus:border-red-400"
            rows={3}
          />
          {errors.description && <p className="text-red-500 mt-1 text-sm">{errors.description}</p>}
        </div>

        {/* ปุ่มย้อนกลับ / บันทึก */}
        <div className="flex justify-between items-center">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-red-900 text-white hover:bg-white hover:text-red-900 rounded-lg shadow font-semibold transition"
          >
            ย้อนกลับ
          </Link>

          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-red-600 hover:bg-white text-white hover:text-red-600 rounded-lg shadow font-semibold transition"
          >
            บันทึกการแก้ไข
          </button>
        </div>
      </form>
    </div>
  );
}
