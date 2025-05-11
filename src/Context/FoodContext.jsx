// src/contexts/FoodContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getAllFoods } from "../services/foodService";

const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      const response = await getAllFoods();

      if (response.success) {
        setFoods(response.data);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(response.data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);

        setError(null);
      } else {
        setError(response.message || "Failed to fetch food items");
      }

      setLoading(false);
    };

    fetchFoods();
  }, []);

  // Get food item by ID
  const getFoodById = (id) => {
    return foods.find((food) => food.id === id) || null;
  };

  // Get foods by category
  const getFoodsByCategory = (category) => {
    if (category === "all") return foods;
    return foods.filter((food) => food.category === category);
  };

  const value = {
    foods,
    categories,
    loading,
    error,
    getFoodById,
    getFoodsByCategory,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
};
