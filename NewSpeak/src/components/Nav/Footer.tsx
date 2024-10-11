import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} NewsSpeak.
          <br />
          All rights reserved.
          <br />
          Developed by
          <br />
          NewsSpeak Team.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
