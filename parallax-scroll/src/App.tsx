import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import Lenis from "@studio-freight/lenis/types";
import { useTransform, useScroll } from "framer-motion";
import ImageColumn from "./components/image-column";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

export default function App() {
  const galleryRef = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raf = (time: any) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.space}></div>
      <div ref={galleryRef} className={styles.gallery}>
        <ImageColumn images={[images[0], images[1], images[2]]} y={y1} />
        <ImageColumn images={[images[3], images[4], images[5]]} y={y2} />
        <ImageColumn images={[images[6], images[7], images[8]]} y={y3} />
        <ImageColumn images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      <div className={styles.space}></div>
    </main>
  );
}
