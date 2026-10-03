import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import IngredientForm from "./components/IngredientForm.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import RecipeDetails from "./components/RecipeDetails.jsx";
import FavoritesPage from "./components/Favoritespage.jsx";
import { findRecipesByIngredients } from "./api/mealApi.js";
import { useFavorites } from "./useFavorites.js";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedCount, setSearchedCount] = useState(0);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [page, setPage] = useState("home"); // "home" | "favorites"

  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const handleSearch = async (ingredients) => {
    setIsLoading(true);
    setSearchedCount(ingredients.length);
    const results = await findRecipesByIngredients(ingredients);
    setRecipes(results);
    setIsLoading(false);
  };

  const handleNavigate = (target) => {
    setSelectedMealId(null); // لو كان فاتح تفاصيل وصفة، اقفلها لما ينقل صفحة
    setPage(target);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        currentPage={page}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
      />

      <main className="flex-1 py-10 px-4">
        {selectedMealId ? (
          <RecipeDetails
            mealId={selectedMealId}
            onBack={() => setSelectedMealId(null)}
          />
        ) : page === "favorites" ? (
          <FavoritesPage
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectMeal={setSelectedMealId}
          />
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              إيه اللي هنطبخه النهارده؟
            </h1>

            <IngredientForm onSearch={handleSearch} isLoading={isLoading} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mt-10">
              {recipes.map((meal) => (
                <RecipeCard
                  key={meal.idMeal}
                  meal={meal}
                  totalIngredients={searchedCount}
                  isFavorite={isFavorite(meal.idMeal)}
                  onToggleFavorite={toggleFavorite}
                  onClick={() => setSelectedMealId(meal.idMeal)}
                />
              ))}
            </div>

            {!isLoading && recipes.length === 0 && searchedCount > 0 && (
              <p className="text-center text-gray-400 mt-10">
                مفيش وصفات مطابقة، جرب مكونات تانية
              </p>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;