import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className={styles.container}>
        <h2 className={styles.footer_header}>KOIN CLOTHING</h2>
        <ul className={styles.footer_contact}>
          <li>
            <FontAwesomeIcon icon={faClock} style={{ maxWidth: "14px" }} />
            <span>
              <b>Opentime: </b>08h00 - 22h00
            </span>
          </li>
          <li>
            <FontAwesomeIcon icon={faPhone} style={{ maxWidth: "14px" }} />
            <span>
              <b>Hotline, Zalo CSKH 1: </b>(+84) 0368 420 840
            </span>
          </li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} style={{ maxWidth: "14px" }} />
            <span>
              <b>Email: </b>cskh.koin@gmail.com
            </span>
          </li>
        </ul>
        <p style={{ lineHeight: "24px" }}>
          Copyright 2024 © Koin Clothing. <br />
          All rights reserved.
        </p>
        <div className={`${styles.footer_more} flex_row`}>
          <div className={`${styles.footer_info} flex_item`}>
            <h3>Thông tin</h3>
            <ul className={`${styles.info_list} flex_item`}>
              <li>Giới thiệu</li>
              <li>Sản phẩm</li>
              <li>Khuyến mãi</li>
              <li>Cách chọn size</li>
              <li>Kiến thức</li>
              <li>Liên hệ</li>
            </ul>
          </div>
          <div className={`${styles.footer_policy} flex_item`}>
            <h3>Các chính sách</h3>
            <ul className={styles.policy_list}>
              <li>Hướng dẫn mua hàng</li>
              <li>Chính sách đổi trả</li>
              <li>Chính sách thanh toán</li>
              <li>Chính sách kiểm hàng</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>
          <div className={styles.footer_prominent}>
            <h3>Sản phẩm nổi bật</h3>
            <ul className={styles.prominent_list}>
              <li>
                <span>1</span>. Áo thun
              </li>
              <li>
                <span>2</span>. Áo thun
              </li>
              <li>
                <span>3</span>. Áo thun
              </li>
              <li>
                <span>4</span>. Áo thun
              </li>
              <li>
                <span>5</span>. Áo thun
              </li>
              <li>
                <span>6</span>. Áo thun
              </li>
            </ul>
          </div>
        </div>
        <div className="footer_follow">
          <h3 style={{ marginTop: "10px", marginBottom: "10px" }}>
            Theo dõi Fanpage
          </h3>
          <Image
            src={
              "https://koinclothing.vn/wp-content/uploads/2023/10/Untitled-1_11zon.webp"
            }
            alt={""}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </footer>
    </>
  );
};

export default Footer;
