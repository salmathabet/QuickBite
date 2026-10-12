import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase.js";
import { useAuth } from "./context/AuthContext.jsx";

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // جيبي المفضلة من Supabase لما المستخدم يتغير
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    let cancelled = false;

    supabase
      .from("favorites")
      .select("meal_id, meal_name, meal_thumb")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error(error);
          return;
        }
        setFavorites(
          data.map((row) => ({
            idMeal: row.meal_id,
            strMeal: row.meal_name,
            strMealThumb: row.meal_thumb,
          }))
        );
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const isFavorite = (mealId) =>
    favorites.some((meal) => meal.idMeal === mealId);

  const toggleFavorite = async (meal) => {
    if (!user) return;

    const { idMeal, strMeal, strMealThumb } = meal;
    const item = { idMeal, strMeal, strMealThumb };
    const exists = favorites.some((m) => m.idMeal === idMeal);

    // حدّثي الشاشة فوراً (optimistic update)
    setFavorites((prev) =>
      exists ? prev.filter((m) => m.idMeal !== idMeal) : [item, ...prev]
    );

    const { error } = exists
      ? await supabase.from("favorites").delete().eq("meal_id", idMeal)
      : await supabase.from("favorites").insert({
          meal_id: idMeal,
          meal_name: strMeal,
          meal_thumb: strMealThumb,
        });

    // لو حصل error رجّعي الحالة زي ما كانت
    if (error) {
      console.error(error);
      setFavorites((prev) =>
        exists ? [item, ...prev] : prev.filter((m) => m.idMeal !== idMeal)
      );
    }
  };

  return { favorites, isFavorite, toggleFavorite };
}