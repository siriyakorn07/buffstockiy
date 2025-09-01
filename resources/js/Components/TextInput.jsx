// ต้องเป็น default export
export default function TextInput(props) {
  return (
    <input
      {...props} // รับทุก props เช่น type, value, onChange
      className={`p-2 rounded bg-gray-700 text-white w-full ${props.className}`}
    />
  );
}
