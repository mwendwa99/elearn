import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import { learn, teach } from "../assets";

register();

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
      slides-per-view="2"
      navigation="true"
      pagination="true"
      loop="true"
      rewind="true"
      autoplay="true"
      speed="500"
      space-between="0"
      delay="1000"
    >
      <swiper-slide>
        <img src={learn} alt="learn" />
      </swiper-slide>
      <swiper-slide>
        <img src={teach} alt="teach" />
      </swiper-slide>
      <swiper-slide>
        <img src={learn} alt="learn" />
      </swiper-slide>
      <swiper-slide>
        <img src={teach} alt="teach" />
      </swiper-slide>
    </swiper-container>
  );
}
