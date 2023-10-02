import styles from "./Textarea.module.scss";

import React, {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import cn from "classnames";

interface ITextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: boolean;
}
const Textarea = ({ error, className, value, ...props }: ITextareaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const setTextareaHeight = () => {
    const elem = ref.current;
    if (elem) {
      elem.style.height = "auto";
      elem.style.height = elem.scrollHeight + "px";
    }
  };

  useEffect(() => {
    setTextareaHeight();
  }, [value]);

  return (
    <textarea
      className={cn(styles.textarea, className, {
        [styles.error]: error,
      })}
      rows={1}
      value={value}
      {...props}
      ref={ref}
    />
  );
};

export default Textarea;
