import React, { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

export default function ImageCarousel({ children }) {
  const swiperRef = useRef(null);
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
  const handleSlideTo = (index) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <Swiper
      ref={swiperRef}
      onSwiper={handleSwiperInit}
      onSlideChange={handleSlideChange}
      modules={[Autoplay]}
      speed={800}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="relative"
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
      <button
        onClick={handlePrevClick}
        disabled={swiperState.isBeginning}
        className="hidden lg:flex absolute z-10 top-1/2 -translate-y-1/2 left-7 bg-white size-13 rounded-full  items-center justify-center"
        style={{ cursor: swiperState.isBeginning ? "auto" : "pointer" }}
      >
        <IoArrowBack
          size={32}
          color={swiperState.isBeginning ? "#6C7275" : "black"}
        />
      </button>
      <button
        onClick={handleNextClick}
        disabled={swiperState.isEnd}
        className="hidden lg:flex absolute z-10 top-1/2 -translate-y-1/2 right-7 bg-white size-13 rounded-full items-center justify-center"
        style={{ cursor: swiperState.isEnd ? "auto" : "pointer" }}
      >
        <IoArrowForward
          size={32}
          color={swiperState.isEnd ? "#6C7275" : "black"}
        />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        {React.Children.map(children, (_, index) => (
          <button
            key={index}
            onClick={() => handleSlideTo(index)}
            className={`rounded-full bg-white cursor-pointer transition-all ${
              swiperState.activeIndex === index ? "h-2 w-7.5" : "size-2"
            }`}
          />
        ))}
      </div>
    </Swiper>
  );
}
