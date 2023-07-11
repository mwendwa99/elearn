import { useRef, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";

import Card from "./Card";

register();

export default function Slider({ classes }) {
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
  }, []);

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
      {classes.map((c, index) => (
        <swiper-slide key={index}>
          <Card
            title={c.title}
            tutor={c.tutor}
            start={c.start}
            price={c.price}
            description={c.description}
          />
        </swiper-slide>
      ))}
    </swiper-container>
  );
}
