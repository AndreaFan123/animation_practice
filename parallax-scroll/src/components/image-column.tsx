import { MotionValue, motion } from "framer-motion";
import styles from "../App.module.css";

export default function ImageColumn({
  images,
  y,
}: {
  images: string[];
  y: MotionValue<number>;
}) {
  return (
    <motion.div style={{ y }} className={styles.column}>
      {images.map((src, index) => (
        <div key={index} className={styles.imageContainer}>
          <img src={`/assets/${src}`} alt={`Image ${index}`} />
        </div>
      ))}
    </motion.div>
  );
}
