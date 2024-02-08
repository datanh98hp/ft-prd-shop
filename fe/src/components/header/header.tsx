import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <section className={styles.header_deal}>
          <p>ƯU ĐÃI - Giảm ngay</p>
        </section>
        <section className={styles.header_nav}>
          <div className={styles.header_menu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="22"
              height="22"
            >
              <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z" />
            </svg>
            <ul className={styles.menu_sub}>
              <li>
                <Link href={"/"}>Giới thiệu</Link>
              </li>
              <li>
                <Link href={"/"}>Sản phẩm</Link>
              </li>
              <li>
                <Link href={"/"}>Khuyến Mại</Link>
              </li>
              <li>
                <Link href={"/"}>Cách chọn size</Link>
              </li>
              <li>
                <Link href={"/"}>Liên Hệ</Link>
              </li>
            </ul>
          </div>
          <div className={styles.header_logo}>
            <Image
              src={
                "https://koinclothing.vn/wp-content/uploads/2023/03/logokoin-thumbnail.png"
              }
              alt={"Logo"}
              width={97}
              height={97}
            ></Image>
          </div>
          <div className={styles.header_heart}>
            <svg
              fill="#000000"
              height="20"
              width="20"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 471.701 471.701"
            >
              <g>
                <path
                  d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                    c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                    l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                    C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                    s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                    c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                    C444.801,187.101,434.001,213.101,414.401,232.701z"
                />
              </g>
            </svg>
          </div>
        </section>
      </div>
    </>
  );
};

export default Header;
