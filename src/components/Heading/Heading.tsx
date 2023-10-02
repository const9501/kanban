import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import styles from "./Heading.module.scss";

interface IHeadingProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  tag: "h1" | "h2" | "h3";
  children: ReactNode;
}

const Heading = ({ tag, children, ...props }: IHeadingProps) => {
  switch (tag) {
    case "h1":
      return (
        <h1 className={styles.h1} {...props}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={styles.h2} {...props}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={styles.h3} {...props}>
          {children}
        </h3>
      );
    default:
      return <></>;
  }
};

export default Heading;
