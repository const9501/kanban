import styles from "./Modal.module.scss";
import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import cn from "classnames";
import {ReactComponent as PlusIcon} from "../../assets/plusIcon.svg"

interface IModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  open: boolean
  setOpen: (open: boolean) => void
  children: ReactNode
  removeChildren?: (children: string) => void
  initialCoords?: DOMRect
}

const Modal = ({open, setOpen, children, removeChildren, initialCoords, ...props}: IModalProps) => {

  const handleClosemodal = () => {
    setOpen(false)
    removeChildren && removeChildren('')
  }

  return (
    <div
      className={cn(styles.modal, {
        [styles.open]: open
      })}
      onClick={handleClosemodal}
    >
      <div
        className={cn(styles.modalContent, {
          [styles.open]: open
        })}
        onClick={e => e.stopPropagation()}
      >
        {children}
        <span
          className={styles.closeModal}
          onClick={handleClosemodal}
        >
          <PlusIcon/>
        </span>
      </div>
    </div>
  );
}

export default Modal;