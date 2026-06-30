// import { Logo }  from "@components/ui/logo/logo";
import { Nav } from "@components/ui/nav/nav";
import styles from "./header.module.css";
import { selectHeaderBg, selectHeaderText } from "@store/catalog/colorPickerSlice";
import { useAppSelector } from "@services/hooks";
import { CSSProperties } from "react";

export const Header = () => {
  const headerBgStyles = useAppSelector(selectHeaderBg);
  const headerTxStyles = useAppSelector(selectHeaderText);
  
 const headerStyle: CSSProperties = {
    backgroundColor: headerBgStyles || 'var(--header-bg, #2563eb)',
    color: headerTxStyles || 'var(--header-text, #ffffff)',
    transition: 'all 0.2s ease',
  };
  return (
    <header className={styles.header} style={headerStyle}>
      <nav className={styles.nav}>
        {/* <Logo /> */}
        <Nav />
        <div className={styles.actions}>
          <div>
            <a>Закладки</a>
          </div>
          <div>
            <a>Войти</a>
          </div>
        </div>
      </nav>
    </header>
  );
};
