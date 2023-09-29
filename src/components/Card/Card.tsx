import styels from "./Card.module.scss";
import Heading from "../Heading/Heading";
import {ReactComponent as DocumentIcon} from "../../assets/documentIcon.svg"
import {ReactComponent as EditIcon} from "../../assets/editIcon.svg"
import {DetailedHTMLProps, HTMLAttributes} from "react";
import cn from "classnames";

interface ICardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string
  description: string
  priority?: 'low' | 'normal' | 'high'
}

const Card = ({title, description, priority, ...props}: ICardProps) => {
  return (
    <div className={styels.card} {...props}>


      <div className={styels.title}>
        <Heading tag='h3'>{title}</Heading>
        {/*<div>*/}
        {/*  <EditIcon/>*/}
        {/*</div>*/}
      </div>

      {
        priority && <div className={cn(styels.priority, {
          [styels.priorityHigh]: priority === "high",
          [styels.priorityNormal]: priority === "normal",
          [styels.priorityLow]: priority === "low"
        })}></div>
      }


      {
        description ?
          <>
            <div className={styels.descriptionTitle}>
              <DocumentIcon/> <span>ОПИСАНИЕ</span>
            </div>
            <div className={styels.descriptionText}>
              {description}
            </div>
          </> :
          <div className={styels.descriptionTitle}>
            <DocumentIcon/> <span>ОПИСАНИЕ ПУСТОЕ</span>
          </div>
      }


    </div>
  );
}

export default Card;