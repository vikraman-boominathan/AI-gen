export default function AiGen() {
  return (
    <div>
      <header className="bg-gray-800 text-white py-4">
        <h2 className="text-3xl font-bold">Book recommender</h2>
      </header>
      <div className="bg-gray-800 min-h-screen flex flex-col items-center gap-4 py-8">
        <textarea
          placeholder="Tell me what you want to read"
          className="w-3/4 p-4 border border-gray-300 rounded-md text-black"
        ></textarea>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Submit Status
        </button>
        <span className="text-white text-lg">
          Your analysis will appear here
        </span>

        <img
          src={"https://via.placeholder.com/300"}
          alt="Loaded"
          className="max-w-xs mt-4 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
