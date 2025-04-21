import axios from "@/utils/axios";
import { useState, useCallback, useEffect } from "react";

export const useProductsFilter = () => {
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under $500", value: "under-500" },
    { label: "$500 - $1000", value: "500-1000" },
    { label: "$1000 - $2000", value: "1000-2000" },
    { label: "Above $2000", value: "above-2000" },
  ];
  const [categories, setCategories] = useState([
    { label: "All Categories", id: "all" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateCategories = useCallback(async () => {
    try {
      const { data } = await axios.get("/categories");
      const newCategories = { label: "All Categories", id: "all" };
      const formattedCategories = data.data.map((cat) => ({
        label: cat.category,
        id: cat.id,
      }));

      const allCategories = [newCategories, ...formattedCategories];
      setCategories(allCategories);

      localStorage.setItem(
        "categories",
        JSON.stringify({
          data: allCategories,
          expirationTime: new Date().getTime() + 1 * 24 * 60 * 60 * 1000, // update every 1 day
        })
      );
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getCachedCategories = () => {
      try {
        const cachedData = localStorage.getItem("categories");
        if (!cachedData) return null;

        return JSON.parse(cachedData);
      } catch (err) {
        console.error("Error parsing cached categories:", err);
        return null;
      }
    };

    const cachedCategories = getCachedCategories();

    if (!cachedCategories) {
      updateCategories();
    } else {
      const { expirationTime, data } = cachedCategories;
      if (new Date().getTime() > expirationTime) {
        updateCategories();
      } else {
        setCategories(data);
        setLoading(false);
      }
    }
  }, [updateCategories]);

  return { categories, priceRanges, loading, error };
};
