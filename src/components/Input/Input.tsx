import styles from "./Input.module.scss";
import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: boolean;
}

const Input = ({ error, className, ...props }: IInputProps) => {
  return (
    <input
      type="text"
      className={cn(styles.input, className, {
        [styles.error]: error === true,
      })}
      {...props}
    />
  );
};

export default Input;
