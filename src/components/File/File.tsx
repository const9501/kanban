import styles from "./File.module.scss";
import { ReactComponent as FileIcon } from "../../assets/documentIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IFileProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  file: any;
  id?: string;
  deleteFile: (id: string) => void;
  disabled?: boolean;
}

const File = ({ file, disabled = false, id = "", deleteFile }: IFileProps) => {
  const downloadFile = () => {
    let link = document.createElement("a");
    link.download = file.name;
    link.href = file.url;
    link.click();
  };

  return (
    <div className={styles.file}>
      <div className={styles.container} onClick={downloadFile}>
        <FileIcon className={styles.fileIcon} />
        <span>{file.name}</span>
      </div>
      {!disabled && (
        <DeleteIcon
          onClick={() => deleteFile(id)}
          className={styles.deleteIcon}
        />
      )}
    </div>
  );
};

export default File;
