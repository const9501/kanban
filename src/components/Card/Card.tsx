import styles from "./Card.module.scss";
import Heading from "../Heading/Heading";
import { ReactComponent as DocumentIcon } from "../../assets/documentIcon.svg";
import { ReactComponent as PlusIcon } from "../../assets/plusIcon.svg";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

interface ICardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string;
  title: string;
  description: string;
  priority?: "low" | "normal" | "high";
  onDelete?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
    title?: string,
  ) => void;
}

const Card = ({
  id,
  title,
  description,
  priority,
  onDelete,
                className,
  ...props
}: ICardProps) => {
  return (
    <div className={cn(styles.card, className)} {...props}>
      <div className={styles.title}>
        <Heading tag="h3">{title}</Heading>
        {onDelete && (
          <div title="Удалить" onClick={(event) => onDelete(event, id, title)}>
            <PlusIcon />
          </div>
        )}
      </div>

      {priority && (
        <div
          className={cn(styles.priority, {
            [styles.priorityHigh]: priority === "high",
            [styles.priorityNormal]: priority === "normal",
            [styles.priorityLow]: priority === "low",
          })}
        ></div>
      )}

      {description ? (
        <>
          <div className={styles.descriptionTitle}>
            <DocumentIcon /> <span>ОПИСАНИЕ</span>
          </div>
          <div className={styles.descriptionText}>{description}</div>
        </>
      ) : (
        <div className={styles.descriptionTitle}>
          <DocumentIcon /> <span>ОПИСАНИЕ ПУСТОЕ</span>
        </div>
      )}
    </div>
  );
};

export default Card;
