import styles from "./TaskCard.module.scss";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectSingleTasks } from "../../store/selectors/taskSelectors";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import { ReactComponent as DocumentIcon } from "../../assets/documentIcon.svg";
import { ReactComponent as PlusIcon } from "../../assets/plusIcon.svg";
import SubTask from "../SubTask/SubTask";
import { ReactComponent as EditIcon } from "../../assets/editIcon.svg";
import Textarea from "../Textarea/Textarea";
import Select from "../Select/Select";
import FilePicker from "../FilePicker/FilePicker";
import { IComment, IFile, ISubTask, TaskActionTypes } from "../../types/types";
import Comment from "../Comment/Comment";
import { ReactComponent as SendIcon } from "../../assets/sendIcon.svg";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface ITaskCardProps {
  id: string;
  setOpenTask: (id: string) => void;
  setOpen: (open: boolean) => void;
}

export interface IRenderComments {
  id: string;
  text: string;
  children: IRenderComments[];
}

const formatMilliseconds = (milliseconds: number) => {
  let seconds = Math.floor(milliseconds / 1000);

  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * 24 * 60 * 60;

  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * 60 * 60;

  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  let result = "";
  if (days > 0) {
    result += days + "д ";
  }
  if (hours > 0) {
    result += hours + "ч ";
  }
  if (minutes > 0) {
    result += minutes + "м ";
  }
  if (seconds > 0) {
    result += seconds + "с";
  }
  return result.trim();
};

const options = [
  { value: "low", title: "Низкий" },
  { value: "normal", title: "Средний" },
  { value: "high", title: "Высокий" },
];

const TaskCard = ({ id, setOpenTask, setOpen }: ITaskCardProps) => {
  const initialTask = useAppSelector((state) => selectSingleTasks(state, id));
  const [task, setTask] = useState(initialTask);
  const [disabled, setDisabled] = useState(true);
  const [subTask, setSubTask] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useAppDispatch();

  const getCommentsByReply = (id: string) => {
    if (task) {
      return task.comments.filter((comment) => comment.isReply === id);
    }
  };

  const commentsTree = (id: string) => {
    const comments = getCommentsByReply(id);
    const result: IRenderComments[] = [];

    if (comments) {
      comments.forEach((comment) => {
        const obj: IRenderComments = {
          id: comment.id,
          text: comment.text,
          children: [],
        };
        obj.children = commentsTree(comment.id);
        result.push(obj);
      });
    }

    return result;
  };

  const renderComments: IRenderComments[] = commentsTree("");

  const removeSubTask = (id: string) => {
    if (task) {
      setTask({
        ...task,
        subTasks: task.subTasks.filter((item) => item.id !== id),
      });
    }
  };
  const editSubTask = (subTask: ISubTask) => {
    if (task) {
      setTask({
        ...task,
        subTasks: task.subTasks.map((item) =>
          item.id === subTask.id ? subTask : item,
        ),
      });
    }
  };

  const setSelectedFiles = (files: IFile[]) => {
    if (task) {
      setTask({ ...task, files: files });
    }
  };

  const addReplyComment = (comment: IComment) => {
    if (task) {
      setTask({ ...task, comments: [...task.comments, comment] });
    }
  };

  useEffect(() => {
    task && dispatch({ type: TaskActionTypes.EDIT_TASK, payload: task });
  }, [task]);

  return task ? (
    <div className={styles.card}>
      <div className={styles.informationSection}>
        <div className={styles.header}>
          <div>
            <EditIcon
              onClick={() => setDisabled(!disabled)}
              title={disabled ? "Редактировать" : "Сохранить"}
              className={cn({ [styles.activeSvg]: !disabled })}
            />
          </div>
          <Textarea
            disabled={disabled}
            onChange={(event) =>
              setTask({ ...task, title: event.target.value })
            }
            value={task.title}
            className={styles.heading}
          />
          <div>
            <span className={styles.taskNumber}>#{task.number}</span>
            <span title={new Date(task.creationDate).toLocaleString()}>
              Создана: {new Date(task.creationDate).toLocaleDateString()}
            </span>
            {task.workingTime ? (
              // <span>В работе: {task.workingTime / 1000}</span>
              <span>В работе: {formatMilliseconds(task.workingTime)}</span>
            ) : null}
            {task.endDate ? (
              <span title={new Date(task.endDate).toLocaleString()}>
                Завершена: {new Date(task.endDate).toLocaleDateString()}
              </span>
            ) : null}
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <span>Статус</span>
            <span>Приоритет</span>
          </div>

          <div className={styles.valuesContainer}>
            <span>
              {task.status === "queue"
                ? "Очередь в работу"
                : task.status === "development"
                ? "В работе"
                : "Готово"}
            </span>
            <span>
              <Select
                className={cn(styles.select, {
                  [styles.lowPriority]: task.priority === "low",
                  [styles.normalPriority]: task.priority === "normal",
                  [styles.highPriority]: task.priority === "high",
                })}
                disabled={disabled}
                defaultValue={task.priority}
                options={options}
                onChange={(event) => {
                  const priority = event.target.value;
                  if (
                    priority === "low" ||
                    priority === "normal" ||
                    priority === "high"
                  ) {
                    setTask({ ...task, priority: priority });
                  }
                }}
              />
            </span>
          </div>
        </div>

        <div className={styles.descriptionWrapper}>
          <div className={styles.descriptionTitle}>
            <DocumentIcon />
            <span>Описание {!task.description && "пустое"}</span>
          </div>
          <Textarea
            value={task.description}
            disabled={disabled}
            onChange={(event) =>
              setTask({ ...task, description: event.target.value })
            }
            className={cn(styles.description, {
              [styles.descriptionDisabled]: disabled,
              [styles.dNone]: !task.description && disabled,
            })}
          />
        </div>

        <div className={styles.subTasksWrapper}>
          <div className={styles.subTaskInputWrapper}>
            <Textarea
              placeholder="Добавить подзадачу"
              value={subTask}
              onChange={(event) => setSubTask(event.target.value)}
            />

            <button
              className={styles.subTaskBtn}
              onClick={(event) => {
                event.preventDefault();
                if (subTask.length) {
                  setTask({
                    ...task,
                    subTasks: [
                      ...task.subTasks,
                      {
                        id: crypto.randomUUID(),
                        task: subTask,
                        completed: false,
                      },
                    ],
                  });
                  setSubTask("");
                }
              }}
            >
              <PlusIcon />
            </button>
          </div>

          {task.subTasks.map((task) => (
            <SubTask
              key={task.id}
              task={task}
              removeSubTask={removeSubTask}
              editSubTask={editSubTask}
              isDisabled={disabled}
            />
          ))}
        </div>

        {
          <FilePicker
            disabled={disabled}
            selectedFiles={task.files}
            setSelectedFiles={setSelectedFiles}
          />
        }
      </div>

      <div className={styles.commentsSection}>
        <div className={styles.commentInputContainer}>
          <Textarea
            placeholder="Написать коментарий..."
            className={styles.commentInput}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />

          <SendIcon
            className={styles.sendIcon}
            onClick={() => {
              setTask({
                ...task,
                comments: [
                  ...task.comments,
                  { id: crypto.randomUUID(), text: comment, isReply: "" },
                ],
              });
              setComment("");
            }}
          />
        </div>

        <div className={styles.commentList}>
          {renderComments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                addReplyComment={addReplyComment}
              />
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <span>Задача не найдена</span>
  );
};

export default TaskCard;
