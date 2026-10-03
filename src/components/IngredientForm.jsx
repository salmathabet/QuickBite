import { useState } from "react";

export default function IngredientForm({ onSearch, isLoading }) {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addIngredient = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    // بيضيف المكون لما تدوس Enter أو فاصلة
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient();
    }
    // بيمسح آخر مكون لو ضغط Backspace والخانة فاضية
    if (e.key === "Backspace" && !inputValue && ingredients.length > 0) {
      setIngredients(ingredients.slice(0, -1));
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length === 0) return;
    onSearch(ingredients);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        إيه المكونات المتاحة عندك؟
      </label>

      {/* صندوق الإدخال اللي بيحتوي الـ tags + الحقل */}
      <div className="flex flex-wrap gap-2 items-center p-3 border border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-orange-400 transition">
        {ingredients.map((ing, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full"
          >
            {ing}
            <button
              type="button"
              onClick={() => removeIngredient(idx)}
              className="text-orange-600 hover:text-orange-900 ml-1"
              aria-label={`إزالة ${ing}`}
            >
              ×
            </button>
          </span>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addIngredient}
          placeholder={ingredients.length === 0 ? "مثال: دجاج، طماطم، أرز" : ""}
          className="flex-1 min-w-[120px] outline-none text-sm py-1"
        />
      </div>

      <p className="text-xs text-gray-400 mt-1">
        دوس Enter أو فاصلة بعد كل مكون
      </p>

      <button
        type="submit"
        disabled={ingredients.length === 0 || isLoading}
        className="mt-4 w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
      >
        {isLoading ? "بندور على وصفات..." : "اقترح وصفات"}
      </button>
    </form>
  );
}