function Navbar({ currentPage, onNavigate, favoritesCount }) {
  const linkClass = (page) =>
    `hover:text-orange-500 transition ${
      currentPage === page ? "text-orange-500 font-semibold" : ""
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2"
        >
          <span className="text-2xl">🍳</span>
          <span className="text-xl font-bold text-gray-800">QuickBite</span>
        </button>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <button onClick={() => onNavigate("home")} className={linkClass("home")}>
            الرئيسية
          </button>
          <button
            onClick={() => onNavigate("favorites")}
            className={linkClass("favorites")}
          >
            المفضلة {favoritesCount > 0 && `(${favoritesCount})`}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar