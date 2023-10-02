import styles from "./SubTask.module.scss";
import React, { useEffect, useState } from "react";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import cn from "classnames";
import Textarea from "../Textarea/Textarea";
import { ISubTask } from "../../store/reducers/taskReducer";

interface ISubTaskProps {
  task: ISubTask;
  removeSubTask?: (id: string) => void;
  isDisabled?: boolean;
  editSubTask?: any;
}

const SubTask = ({
  task,
  removeSubTask,
  isDisabled,
  editSubTask,
}: ISubTaskProps) => {
  const [value, setValue] = useState(task);

  useEffect(() => {
    editSubTask(value);
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        checked={value.completed}
        onChange={(event) => {
          setValue({ ...task, completed: event.target.checked });
        }}
        className={styles.checkbox}
      />

      <Textarea
        value={value.task}
        onChange={(event) => {
          setValue({ ...task, task: event.target.value });
        }}
        disabled={isDisabled}
        className={cn(styles.textarea, {
          [styles.disabledTextarea]: isDisabled,
        })}
      />

      {!isDisabled && (
        <DeleteIcon
          title="Удалить"
          className={styles.svg}
          onClick={() => removeSubTask && removeSubTask(task.id)}
        />
      )}
    </div>
  );
};

export default SubTask;
