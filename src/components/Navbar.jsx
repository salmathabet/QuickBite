import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar({ currentPage, onNavigate, favoritesCount }) {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const displayName =
    user?.user_metadata?.name || user?.email?.split("@")[0];
  const initial = displayName?.[0]?.toUpperCase();

  // اقفلي القايمة لما تدوسي برّاها
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 h-16">
        {/* اللوجو */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 group"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition">
            🍳
          </span>
          <span className="text-xl font-extrabold text-gray-800 tracking-tight">
            Quick<span className="text-orange-500">Bite</span>
          </span>
        </button>

        {user && (
          <div className="flex items-center gap-3">
            {/* زرار المفضلة */}
            <button
              onClick={() => onNavigate("favorites")}
              className={`flex items-center gap-2 rounded-full pl-3 pr-2 py-1.5 text-sm font-medium transition ${
                currentPage === "favorites"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <span>المفضلة</span>
              <span
                className={`min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold flex items-center justify-center ${
                  currentPage === "favorites"
                    ? "bg-white text-orange-600"
                    : "bg-orange-500 text-white"
                }`}
              >
                {favoritesCount}
              </span>
            </button>

            {/* الأفاتار والقايمة */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="قايمة الحساب"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold flex items-center justify-center shadow-sm hover:shadow-md transition ring-2 ring-white"
              >
                {initial}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800 truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="w-full text-right px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    تسجيل خروج
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;