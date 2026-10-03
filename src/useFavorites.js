import { useEffect, useState } from "react";

const STORAGE_KEY = "quickbite_favorites";

function loadFavorites() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
  }
}, [favorites]);

  const isFavorite = (mealId) =>
    favorites.some((meal) => meal.idMeal === mealId);

  const toggleFavorite = (meal) => {
  const { idMeal, strMeal, strMealThumb } = meal;

  setFavorites((prev) =>
    prev.some((m) => m.idMeal === idMeal)
      ? prev.filter((m) => m.idMeal !== idMeal)
      : [...prev, { idMeal, strMeal, strMealThumb }]
  );
};

  return { favorites, isFavorite, toggleFavorite };
}