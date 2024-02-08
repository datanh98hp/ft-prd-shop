import Image from "next/image";
import { blob } from "stream/consumers";

const FeedbackItem = ({ image, alt }: { image: string; alt: string }) => {
  return (
    <>
      <Image
        src={image}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      ></Image>
    </>
  );
};

export default FeedbackItem;
