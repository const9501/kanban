import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: "primary" | "ghost";
  children: ReactNode;
  icon?: ReactNode;
}

const Button = ({
  variant,
  children,
  icon,
  className,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: variant === "primary",
        [styles.ghost]: variant === "ghost",
      })}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;
