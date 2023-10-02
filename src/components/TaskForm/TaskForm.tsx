import styles from "./TaskForm.module.scss";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import React, { useState } from "react";
import {
  ISubTask,
  ITask,
  TaskActionTypes,
} from "../../store/reducers/taskReducer";
import Select from "../Select/Select";
import { ReactComponent as PlusIcon } from "../../assets/plusIcon.svg";
import SubTask from "../SubTask/SubTask";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import Textarea from "../Textarea/Textarea";
import FilePicker from "../FilePicker/FilePicker";

const options = [
  { value: "low", title: "Низкий" },
  { value: "normal", title: "Средний" },
  { value: "high", title: "Высокий" },
];

const TaskForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const { id } = useParams();
  const tasksQuantity =
    useAppSelector((state) =>
      state.tasks.filter((task) => task.projectId === id),
    ).length + 1;

  const initialTask: ITask = {
    id: crypto.randomUUID(),
    index: tasksQuantity,
    projectId: id || "",
    number: tasksQuantity,
    title: "",
    description: "",
    creationDate: 0,
    startDev: 0,
    workingTime: 0,
    endDate: 0,
    priority: "normal",
    files: [],
    status: "queue",
    subTasks: [],
    comments: [],
  };

  const dispatch = useAppDispatch();
  const [task, setTask] = useState<ITask>(initialTask);
  const [subTasks, setSubTasks] = useState<ISubTask[]>([]);
  const [subTask, setSubTask] = useState("");
  const [inputError, setInputError] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (task.title.trim()) {
      dispatch({
        type: TaskActionTypes.ADD_TASK,
        payload: {
          ...task,
          creationDate: Date.now(),
          subTasks: subTasks,
          files: selectedFiles,
        },
      });
      setTask(initialTask);
      setInputError(false);
      setOpen(false);
      setSelectedFiles([]);
    } else {
      setTask({ ...task, title: "" });
      setInputError(true);
    }
  };

  const editSubTask = (subTask: ISubTask) => {
    setSubTasks(
      subTasks.map((item) => (item.id === subTask.id ? subTask : item)),
    );
  };

  const removeSubTask = (id: string) => {
    setSubTasks(subTasks.filter((item) => item.id !== id));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Heading tag="h2">Новая задача</Heading>

      <div className={styles.container}>
        <Textarea
          error={inputError}
          placeholder="Название*"
          onChange={(event) => setTask({ ...task, title: event.target.value })}
          value={task.title}
        />
      </div>

      <div className={styles.container}>
        <Textarea
          placeholder="Описание"
          onChange={(event) => {
            setTask({ ...task, description: event.target.value });
          }}
          value={task.description}
        />
      </div>

      <Select
        description="Приоритет"
        defaultValue="normal"
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
                setSubTasks([
                  ...subTasks,
                  { id: crypto.randomUUID(), task: subTask, completed: false },
                ]);
                setSubTask("");
              }
            }}
          >
            <PlusIcon />
          </button>
        </div>

        {subTasks.map((task) => (
          <SubTask
            key={task.id}
            task={task}
            editSubTask={editSubTask}
            removeSubTask={removeSubTask}
          />
        ))}
      </div>

      <FilePicker
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />

      <Button type="submit" variant="primary">
        Создать
      </Button>
    </form>
  );
};

export default TaskForm;
