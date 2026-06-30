import type { IconType } from "react-icons";
import clsx from "clsx";
import styles from "./AppIcon.module.css";

type AppIconProps = {
  icon?: IconType;
  size?: number;
  className?: string;
};

export const AppIcon = ({
  icon: Icon,
  size = 18,
  className,
}: AppIconProps) => {
  if (!Icon) return null;

  return (
    <Icon
      size={size}
      className={clsx(styles.icon, className)}
    />
  );
};