import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

import Products from "@/components/product/products";
import Feedbacks from "@/components/feedback/feedbacks";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.banner}>
        <section className={styles.banner_img} style={{ textAlign: "center" }}>
          <Image
            src={
              "https://koinclothing.vn/wp-content/uploads/2023/11/ao-thun-unisex-oversize-koin-clothing-banner.webp"
            }
            alt={"Banner"}
            sizes="100vw"
            width={"520"}
            height={"688"}
            // style={{
            //   width: "100%",
            //   height: "auto",
            // }}
          ></Image>
        </section>
        <section
          className={styles.banner_heading}
          style={{
            padding: "40px 10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            fontSize: "15px",
            lineHeight: "1.5",
            wordSpacing: "2px",
          }}
        >
          <h2
            style={{
              marginBottom: "40px",
              fontSize: "32px",
              textAlign: "center",
              width: "60%",
            }}
          >
            ÁO THUN LOCAL BRAND FORM OVERSIZE
          </h2>
          <p>Chào mừng bạn đến với Thương hiệu Koin Clothing!</p>
          <div>{"."}</div>
          <p>
            {"Chuyên cung cấp "}
            Áo thun nam nữ Form Oversize
            {" trẻ trung và năng động."}
          </p>
          <p>– Chất liệu: Vải 100% Cotton 2 Chiều (Định lượng: 250Gsm).</p>
          <p>– Phần cổ Bo Rib giúp cổ áo không bị giãn theo thời gian.</p>
          <p>– Form áo Oversize (M, L, XL) phù hợp với nhiều kiểu hình thể.</p>
          <p>
            – Hỗ trợ đổi/trả miễn phí nếu khách hàng không hài lòng về sản phẩm.
          </p>
        </section>
      </div>
      <div className={styles.products}>
        <div className={styles.latest}>
          <h2 style={{ margin: "0 0 20px", textAlign: "center" }}>Latest</h2>
          <Products />
        </div>
        <div className={styles.bestSelling}>
          <h2 style={{ margin: "20px 0", textAlign: "center" }}>
            Best Selling
          </h2>
          <Products />
          <Link href={"#"} className={styles.showMore}>
            Show More
          </Link>
        </div>
      </div>
      <div className={styles.feedback}>
        <h2 style={{ textAlign: "center" }}>Awesome Feedback</h2>
        <Feedbacks />
      </div>

      <div className={styles.footer}>
        <Footer></Footer>
      </div>
    </main>
  );
}
