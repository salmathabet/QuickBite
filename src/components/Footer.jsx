function Footer({ onNavigate }) {
  return (
    <footer dir="rtl" className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <p className="flex flex-wrap items-center justify-center gap-1 text-sm text-gray-500">
          <span>صُنع بـ</span>
          <span aria-hidden="true">❤️</span>
          <span>لمحبي الطبخ</span>
          <span>-</span>
          <span dir="ltr">QuickBite © {new Date().getFullYear()}</span>
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-3 text-xs text-gray-400">
          <button
            type="button"
            onClick={() => onNavigate("about")}
            className="hover:text-orange-500 transition"
          >
            عن الموقع
          </button>
          <span aria-hidden="true">•</span>
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className="hover:text-orange-500 transition"
          >
            تواصل معنا
          </button>
          <span aria-hidden="true">•</span>
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-orange-500 transition"
          >
            بيانات الوصفات من <bdi>TheMealDB</bdi>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;