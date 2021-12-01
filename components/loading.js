export default function Loading({ show }) {
  return (
    <div
      className={`w-screen h-screen flex flex-row justify-center items-center z-20 opacity-80 bg-gray-200 overflow-hidden ${
        show ? "fixed" : "hidden"
      }`}
    >
      <img className="w-12 h-12" src="/assets/loading/loading-circle.svg" />
    </div>
  );
}
