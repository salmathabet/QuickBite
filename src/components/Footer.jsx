function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <p className="text-sm text-gray-500">
          صُنع بـ ❤️ لمحبي الطبخ - QuickBite © {new Date().getFullYear()}
        </p>
        <div className="flex justify-center gap-4 mt-3 text-xs text-gray-400">
          <a href="#" className="hover:text-orange-500 transition">
            عن الموقع
          </a>
          <span>•</span>
          <a href="#" className="hover:text-orange-500 transition">
            تواصل معنا
          </a>
          <span>•</span>
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-orange-500 transition"
          >
            بيانات الوصفات من TheMealDB
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer