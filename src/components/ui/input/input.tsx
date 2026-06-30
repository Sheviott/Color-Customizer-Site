import styles from "./input.module.css";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  icon,
  iconPosition = "left",
}: InputProps) => {
return (
    <div className={styles.wrapper}>
      {icon && iconPosition === "left" && (
        <span className={`${styles.icon} ${styles.left}`}>{icon}</span>
      )}

      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        name={name}
      />

      {icon && iconPosition === "right" && (
        <span className={`${styles.icon} ${styles.right}`}>{icon}</span>
      )}
    </div>
  );
  
};