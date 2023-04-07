import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";

import Card from "./Card";

register();

const cardArray = [
  {
    id: 1,
    component: <Card />,
  },
  {
    id: 2,
    component: <Card />,
  },
  {
    id: 3,
    component: <Card />,
  },
  {
    id: 4,
    component: <Card />,
  },
  {
    id: 5,
    component: <Card />,
  },
];

export default function Slider() {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener("progress", (e) => {
      const [swiper, progress] = e.detail;
      // console.log(progress);
    });

    swiperElRef.current.addEventListener("slidechange", (e) => {
      // console.log("slide changed");
    });
  }, []);

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view="3"
      // navigation="true"
      // pagination="true"
      loop="true"
      rewind="true"
      autoplay="true"
      speed="1000"
      space-between="10"
      delay="2000"
      autoHeight="true"
    >
      {cardArray.map((card) => (
        <swiper-slide key={card.id}>{card.component}</swiper-slide>
      ))}
    </swiper-container>
  );
}
