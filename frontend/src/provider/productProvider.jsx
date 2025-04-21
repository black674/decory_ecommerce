import axios from "@/utils/axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [productReviews, setProductReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const navigate = useNavigate();
  const { id, slug } = useParams();

  const totalRating = useMemo(() => {
    const rating =
      productReviews?.reduce((sum, review) => {
        return sum + review.rating;
      }, 0) / productReviews.length;

    return Math.round(rating);
  }, [productReviews]);

  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/products?filters[documentId][$eq]=${id}&populate[categories]=true&populate[colors]=true&populate[sizes]=true`
        );
        const item = data.data[0];

        if (item.title.toLowerCase() !== slug.toLowerCase())
          navigate(`/product/${id}/${item.title}`, { replace: true });

        setProductDetails(item);
      } catch (error) {
        console.log("error happend while calling product details api: ", error);
        toast.error("Something went wrong");
        navigate("/error");
      } finally {
        setLoading(false);
      }
    };

    const getProductReviews = async () => {
      setLoadingReviews(true);
      try {
        const { data } = await axios.get(
          `/reviews?filters[product][documentId]=${id}`
        );
        setProductReviews(data.data);
      } catch (error) {
        console.log("error happend while calling product details api: ", error);
        toast.error("could not fetch reviews");
      } finally {
        setLoadingReviews(false);
      }
    };

    getProductDetails();
    getProductReviews();
  }, [id, navigate, slug]);

  return (
    <ProductContext.Provider
      value={{
        productDetails,
        productReviews,
        totalRating,
        loading,
        loadingReviews,
        setReviews: setProductReviews,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
