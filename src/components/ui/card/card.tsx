
import { CardUIData } from "@components/card/card";
import styles from "./card.module.css";
import clsx from "clsx";

type CardUIProps = {
  cardData: CardUIData;
  apiStatus: boolean;
}
export const CardUI = ({ cardData, apiStatus }: CardUIProps) => {

  return (
    <li className={styles.card}>
      {cardData.image ? (<img
        src={cardData.image}
        alt="Картинка из API"
        className={clsx(styles.image, { [styles.hidden]: !apiStatus })}
        loading="lazy"
      />) : null

      }

      <p className={styles.title}>{apiStatus ? cardData.title : 'я не текст'}</p>
      <p className={styles.description}>{apiStatus ? cardData.description : ''}</p>
    </li>
  )
};