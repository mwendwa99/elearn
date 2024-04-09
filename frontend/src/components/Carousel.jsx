import { useRef, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
import DiscountCard from "./DiscountCard";

import Card from "./Card";

register();

export default function Slider({ courseData, discountData }) {
  const swiperElRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // listen for window resize
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener("progress", (e) => {
      const [swiper, progress] = e.detail;
      // console.log(progress);
    });

    swiperElRef.current.addEventListener("slidechange", (e) => {
      // console.log("slide changed");
    });
  }, [swiperElRef.current, windowWidth]);

  return (
    <swiper-container
      ref={swiperElRef}
      // slides per view should be 1 on smaller screens and 3 in bigger screens
      slides-per-view={windowWidth < 600 ? "1" : "3"}
      loop="true"
      rewind="true"
      autoplay="true"
      speed="1000"
      space-between="10"
      delay="2000"
      autoHeight="true"
      navigation="false"
      pagination="true"
    >
      {courseData &&
        courseData.map((c, index) => (
          <swiper-slide key={index}>
            <Card
              title={c?.title}
              tutor={c?.tutor}
              start={c?.start}
              price={c?.price}
              image={c?.photoUrl}
              subtitle={c?.subtitle}
              description={c?.description}
            />
          </swiper-slide>
        ))}
      {discountData &&
        discountData.map((d, index) => (
          <swiper-slide key={index}>
            <DiscountCard
              image={d.photoUrl}
              title={d.title}
              description={d.description}
              onClick={() => console.log("clicked")}
            />
          </swiper-slide>
        ))}
    </swiper-container>
  );
}
