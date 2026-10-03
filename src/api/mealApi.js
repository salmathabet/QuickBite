const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// بتدور بمكون واحد وترجع قايمة الوصفات اللي فيه
async function searchByIngredient(ingredient) {
  const res = await fetch(
    `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
  );
  const data = await res.json();
  return data.meals || [];
}

// بتاخد كذا مكون، تدور على كل واحد لوحده، وترجع الوصفات
// مرتبة حسب عدد المكونات اللي اتطابقت فيها (الأكتر تطابق الأول)
export async function findRecipesByIngredients(ingredients) {
  const resultsPerIngredient = await Promise.all(
    ingredients.map((ing) => searchByIngredient(ing))
  );

  // بنعد كام مرة ظهرت كل وصفة (يعني اتطابقت مع كام مكون)
  const mealCounts = new Map();

  resultsPerIngredient.forEach((meals) => {
    meals.forEach((meal) => {
      const existing = mealCounts.get(meal.idMeal);
      if (existing) {
        existing.matchCount += 1;
      } else {
        mealCounts.set(meal.idMeal, { ...meal, matchCount: 1 });
      }
    });
  });

  // ترتيب حسب الأكتر تطابقًا مع المكونات المدخلة
  return Array.from(mealCounts.values()).sort(
    (a, b) => b.matchCount - a.matchCount
  );
}

// تفاصيل وصفة واحدة (خطوات التحضير، المكونات الكاملة...)
export async function getRecipeDetails(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals?.[0] || null;
}