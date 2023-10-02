import styles from "./Select.module.scss";
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import cn from "classnames";

interface ISelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: {
    value: string;
    title: string;
  }[];
  description?: string;
}

const Select = ({
  options,
  description,
  className,
  ...props
}: ISelectProps) => {
  return (
    <div className={styles.wrapper}>
      {description && <span className={styles.description}>{description}</span>}
      <select className={cn(styles.select, className)} {...props}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
