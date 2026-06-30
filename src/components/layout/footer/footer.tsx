import { useAppSelector } from "@services/hooks";
import styles from "./footer.module.css";
import { selectFooterBg, selectFooterText } from "@store/catalog/colorPickerSlice";

export const Footer = () => {
  const footerBgStyles = useAppSelector(selectFooterBg);
  const footerTxStyles = useAppSelector(selectFooterText);
  const footerStyle = {
    backgroundColor: footerBgStyles || "var(--bg)",
    color: footerTxStyles || "var(--text)",
    transition: "all 0.2s ease",
  };
  return (
    <footer className={styles.footer} style={footerStyle}>
      <div className={styles.nav}>
        <p>2026</p>
      </div>
    </footer>
  );
};
