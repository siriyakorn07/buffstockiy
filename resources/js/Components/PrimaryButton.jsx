export default function PrimaryButton(props) {
  return (
    <button
      {...props}
      className={`p-2 rounded text-white bg-red-600 hover:bg-red-500 transition ${props.className}`}
    >
      {props.children}
    </button>
  );
}
