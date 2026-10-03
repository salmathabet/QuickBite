function RecipeCard({
  meal,
  totalIngredients,
  onClick,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 cursor-pointer"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(meal);
        }}
        className="absolute top-2 left-2 z-10 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:scale-110 transition"
        aria-label="إضافة للمفضلة"
      >
        <span className={isFavorite ? "text-red-500" : "text-gray-300"}>
          {isFavorite ? "♥" : "♡"}
        </span>
      </button>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-1">
          {meal.strMeal}
        </h3>
        {totalIngredients > 0 && (
          <span className="text-sm text-gray-500">
            {totalIngredients} مكونات
          </span>
        )}
      </div>
    </div>
  );
}

export default RecipeCard