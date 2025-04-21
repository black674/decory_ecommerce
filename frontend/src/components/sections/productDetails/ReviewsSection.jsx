import Button from "@/components/ui/button/Button";
import ReviewCard from "@/components/ui/cards/ReviewCard";
import ReviewModal from "@/components/ui/modals/ReviewModal";
import { useAuth } from "@/provider/authProvider";
import { useProduct } from "@/provider/productProvider";
import { Flex, Select, TextField } from "@radix-ui/themes";
import { useWindowWidth } from "@react-hook/window-size";
import axios from "@/utils/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

const reviewFilters = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Highest Rated", value: "highest-rated" },
  { label: "Lowest Rated", value: "lowest-rated" },
  { label: "Most Helpful", value: "most-helpful" },
];

export default function ReviewsSection() {
  const width = useWindowWidth();
  const [reviewsFilter, setReviewsFilter] = useState("newest");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { id } = useParams();

  const { user } = useAuth();
  const { productReviews, loadingReviews, totalRating, setReviews } =
    useProduct();

  const openReviewModal = () => {
    if (!user) return toast.error("Please login to write a review");
    if (desc.length < 4) return toast.error("Please write a description");
    setIsOpenModal(true);
  };

  const handleReviewSubmit = async () => {
    if (!title || !desc || !rating)
      return toast.error("Please fill all the fields");
    try {
      toast.loading("Submitting review...", {
        id: "loading-review",
      });
      const { data } = await axios.post(
        "/reviews",
        {
          data: {
            title,
            description: desc,
            rating,
            product: id,
            avatar: user.avatar || user.name.slice(0, 1).toUpperCase(),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
          },
        }
      );
      setReviews([data.data, ...productReviews]);
      toast.success("Review submitted successfully", {
        id: "loading-review",
      });
    } catch (error) {
      console.error("error happend while sending reviwe:", error);
      toast.error("Something went wrong", {
        id: "loading-review",
      });
    } finally {
      setTitle("");
      setDesc("");
      setRating(0);
    }
  };

  if (loadingReviews) return null;

  return (
    <div className="py-6 px-2 lg:py-12 lg:px-4 space-y-8">
      <div className="space-y-8">
        <div className="space-y-6">
          <h2 className="!font-poppins text-xl leading-7 lg:text-[28px] lg:leading-8.5">
            Customer Reviews
          </h2>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <span key={index} className="text-natural-700">
                  {index < totalRating ? (
                    <IoStar size={16} />
                  ) : (
                    <IoStarOutline size={16} />
                  )}
                </span>
              ))}
            </div>
            <span className="text-natural-900 text-sm leading-5">
              ({productReviews.length}) Reviews
            </span>
          </div>
        </div>

        <TextField.Root
          radius="large"
          size="3"
          placeholder="Share your thoughts"
          className="!h-14 lg:!h-18"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        >
          <TextField.Slot>{null}</TextField.Slot>
          <TextField.Slot>
            <Button
              onClick={openReviewModal}
              className="!rounded-full !p-2.5 lg:!py-2.5 lg:!px-10"
            >
              {width < 1280 ? (
                <FaArrowRight size={16} />
              ) : (
                <p className="leading-7">Write Review</p>
              )}
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </div>

      <ReviewModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        rating={rating}
        setRating={setRating}
        handleSubmit={handleReviewSubmit}
      />

      {productReviews.length > 0 && (
        <>
          <div className="space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <h3 className="!font-poppins text-[28px] leading-8.5">
                {productReviews.length} Reviews
              </h3>
              <Flex direction="column" gap="2" width="260px">
                <Select.Root
                  size="3"
                  value={reviewsFilter}
                  onValueChange={setReviewsFilter}
                >
                  <Select.Trigger radius="large">
                    {
                      reviewFilters.find((cat) => cat.value === reviewsFilter)
                        ?.label
                    }
                  </Select.Trigger>
                  <Select.Content position="popper">
                    {reviewFilters.map((category) => {
                      return (
                        <Select.Item
                          key={category.value}
                          value={category.value}
                        >
                          {category.label}
                        </Select.Item>
                      );
                    })}
                  </Select.Content>
                </Select.Root>
              </Flex>
            </div>
            {productReviews.map((review) => (
              <ReviewCard {...review} key={review.id} />
            ))}
          </div>
          <Button
            variant="outline"
            className="!rounded-full !px-10 /block mx-auto hidden"
          >
            Show More
          </Button>
        </>
      )}
    </div>
  );
}
