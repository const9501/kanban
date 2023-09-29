import styles from "./FilePicker.module.scss";
import {ReactComponent as UploadFileIcon} from "../../assets/uploadFileIcon.svg"
import Button from "../Button/Button";
import {ChangeEvent} from "react";
import File from "../File/File";
import {IFile} from "../../store/reducers/taskReducer";


interface IFilePickerProps {
  selectedFiles: IFile[]
  setSelectedFiles: (files: IFile[]) => void
  disabled?: boolean
}
const FilePicker = ({selectedFiles, setSelectedFiles, disabled}: IFilePickerProps) => {


  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const filesObj = event.target.files
    if (filesObj) {
      const filesList = Object.entries(filesObj).map(([key, file]): IFile=> ({
           id: crypto.randomUUID(), url: URL.createObjectURL(new Blob([file])), name: file.name
        })
      )
      setSelectedFiles(filesList);
    }
  }

  const deleteFile = (id: string) => {
    setSelectedFiles(
      selectedFiles.filter((file) => file.id + '' !== id)
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.filePicker}>
        <Button variant='ghost' icon={<UploadFileIcon/>}>Выберите файл</Button>
        <input type="file" multiple onChange={handleUpload} className={styles.input}/>
      </div>

      {
        selectedFiles.length ? selectedFiles.map((file) =>
          <File key={file.id} deleteFile={deleteFile} id={file.id} file={file} disabled={disabled}/>
        ) : null

      }

    </div>
  );
}

export default FilePicker;