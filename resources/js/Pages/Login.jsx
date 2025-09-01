import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/login'); // ส่งไป route login ของ Laravel
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-red-900 via-black to-red-800 p-6">
      <form
        onSubmit={submit}
        className="bg-gradient-to-b from-gray-900 via-red-900 to-red-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        {/* หัวเรื่อง */}
        <h1 className="text-3xl font-bold mb-6 text-red-400 text-center tracking-wide">
          เข้าสู่ระบบ
        </h1>

        {/* Error จาก backend */}
        {errors.email && (
          <div className="mb-4 text-center text-red-300 text-sm">{errors.email}</div>
        )}

        {/* Input Email */}
        <div className="mb-4">
          <TextInput
            type="email"
            value={data.email}
            placeholder="อีเมล"
            onChange={(e) => setData('email', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-red-400 focus:border-red-400"
          />
        </div>

        {/* Input Password */}
        <div className="mb-6">
          <TextInput
            type="password"
            value={data.password}
            placeholder="รหัสผ่าน"
            onChange={(e) => setData('password', e.target.value)}
            className="w-full p-3 rounded-lg border border-red-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-red-400 focus:border-red-400"
          />
        </div>

        {/* ปุ่ม Submit */}
        <PrimaryButton
          type="submit"
          disabled={processing}
          className={`w-full text-lg font-semibold py-2 rounded-lg shadow ${
            processing ? 'bg-red-400 cursor-not-allowed text-white' : 'bg-red-600 hover:bg-red-500 text-white'
          } transition`}
        >
          {processing ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </PrimaryButton>
      </form>
    </div>
  );
}
