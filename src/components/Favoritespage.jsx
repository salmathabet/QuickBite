import RecipeCard from "./RecipeCard";

function FavoritesPage({ favorites, onToggleFavorite, onSelectMeal }) {
  if (favorites.length === 0) {
    return (
      <div className="text-center mt-16">
        <p className="text-4xl mb-3">🤍</p>
        <p className="text-gray-400">
          لسه مفيش وصفات محفوظة، دوس على القلب في أي وصفة عشان تحفظها هنا
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        وصفاتك المفضلة
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {favorites.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            meal={meal}
            totalIngredients={0}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
            onClick={() => onSelectMeal(meal.idMeal)}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage