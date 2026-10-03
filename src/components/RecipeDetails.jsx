import { useEffect, useState } from "react";
import { getRecipeDetails } from "../api/mealApi.js";

export default function RecipeDetails({ mealId, onBack }) {
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getRecipeDetails(mealId).then((data) => {
      setMeal(data);
      setIsLoading(false);
    });
  }, [mealId]);

  if (isLoading) {
    return <p className="text-center text-gray-400 mt-10">بيحمّل التفاصيل...</p>;
  }

  if (!meal) {
    return <p className="text-center text-gray-400 mt-10">مقدرناش نجيب التفاصيل</p>;
  }

  // TheMealDB بيخزن المكونات في 20 حقل منفصل (strIngredient1...20)
  // فبنلمّهم في قائمة واحدة هنا
  const ingredientsList = Array.from({ length: 20 }, (_, i) => {
    const ing = meal[`strIngredient${i + 1}`];
    const measure = meal[`strMeasure${i + 1}`];
    return ing && ing.trim() ? `${measure} ${ing}` : null;
  }).filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 mt-6">
      <button
        onClick={onBack}
        className="text-orange-600 font-medium mb-4 hover:underline"
      >
        ← رجوع للنتائج
      </button>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-56 object-cover rounded-lg mb-4"
      />

      <h2 className="text-2xl font-bold text-gray-800 mb-4">{meal.strMeal}</h2>

      <h3 className="font-semibold text-gray-700 mb-2">المكونات</h3>
      <ul className="list-disc list-inside text-sm text-gray-600 mb-6 space-y-1">
        {ingredientsList.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h3 className="font-semibold text-gray-700 mb-2">طريقة التحضير</h3>
      <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
        {meal.strInstructions}
      </p>

      {meal.strYoutube && (
        <a
          href={meal.strYoutube}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 text-sm text-red-600 hover:underline"
        >
          شاهد فيديو الطريقة على يوتيوب
        </a>
      )}
    </div>
  );
}