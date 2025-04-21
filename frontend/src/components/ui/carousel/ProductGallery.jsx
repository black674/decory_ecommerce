import { useCallback, useRef, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Zoom from "react-medium-image-zoom";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "react-medium-image-zoom/dist/styles.css";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductGallery({ images }) {
  const swiperRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiperState, setSwiperState] = useState({
    isEnd: false,
    isBeginning: true,
    activeIndex: 0,
  });

  const handleSwiperInit = useCallback((swiper) => {
    swiperRef.current = swiper;
    setSwiperState({
      isEnd: swiper.isEnd,
      isBeginning: swiper.isBeginning,
      activeIndex: swiper.activeIndex,
    });
  }, []);

  const handleSlideChange = useCallback((swiper) => {
    setSwiperState({
      isEnd: swiper.isEnd,
      isBeginning: swiper.isBeginning,
      activeIndex: swiper.activeIndex,
    });
  }, []);

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="space-y-6">
      <Swiper
        onSwiper={handleSwiperInit}
        onSlideChange={handleSlideChange}
        thumbs={{ swiper: thumbsSwiper }}
        className="relative overflow-hidden"
        modules={[Thumbs]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="bg-natural-200">
            <Zoom>
              <img
                src={image}
                loading="eager"
                alt="productImage"
                className="w-full object-cover min-h-[400px]"
              />
            </Zoom>
          </SwiperSlide>
        ))}
        <button
          onClick={handlePrevClick}
          disabled={swiperState.isBeginning}
          className="flex absolute z-10 top-1/2 -translate-y-1/2 left-7 bg-white size-10 rounded-full items-center justify-center"
          style={{ cursor: swiperState.isBeginning ? "auto" : "pointer" }}
        >
          <IoArrowBack
            size={24}
            color={swiperState.isBeginning ? "#6C7275" : "black"}
          />
        </button>
        <button
          onClick={handleNextClick}
          disabled={swiperState.isEnd}
          className="flex absolute z-10 top-1/2 -translate-y-1/2 right-7 bg-white size-10 rounded-full items-center justify-center"
          style={{ cursor: swiperState.isEnd ? "auto" : "pointer" }}
        >
          <IoArrowForward
            size={24}
            color={swiperState.isEnd ? "#6C7275" : "black"}
          />
        </button>
      </Swiper>
      <div className="hidden lg:block">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          modules={[FreeMode, Thumbs]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt="" className="w-42" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
