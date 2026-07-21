import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-800 text-white shadow-md">
      <button
        onClick={() => navigate("/")}
        className="text-2xl font-bold hover:text-gray-300 transition-colors"
      >
        Automatic Inventory System
      </button>

      <button
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
    </nav>
  );
}

export default Navbar;