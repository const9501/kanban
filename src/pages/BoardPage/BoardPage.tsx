import Heading from "../../components/Heading/Heading";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./BoardPage.module.scss";
import Button from "../../components/Button/Button";
import React, { useEffect, useState } from "react";
import { ReactComponent as PlusIcon } from "../../assets/plusIcon.svg";
import { ReactComponent as HomeIcon } from "../../assets/homeIcon.svg";
import { ReactComponent as SearchIcon } from "../../assets/searchIcon.svg";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { TaskActionTypes } from "../../types/types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Modal from "../../components/Modal/Modal";
import TaskForm from "../../components/TaskForm/TaskForm";
import {
  selectDevelopmentTasks,
  selectDoneTasks,
  selectQueueTasks,
} from "../../store/selectors/taskSelectors";
import Card from "../../components/Card/Card";
import TaskCard from "../../components/TaskCard/TaskCard";
import Input from "../../components/Input/Input";

const BoardPage = () => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];

      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const queueTasks = useAppSelector((state) =>
    selectQueueTasks(state, id, search),
  );
  const developmentTasks = useAppSelector((state) =>
    selectDevelopmentTasks(state, id, search),
  );
  const doneTasks = useAppSelector((state) =>
    selectDoneTasks(state, id, search),
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [openTask, setOpenTask] = useState("");
  const project = useAppSelector((state) =>
    state.projects.find((proj) => proj.id === id),
  );

  const navigate = useNavigate();
  const goHome = () => navigate("/", { replace: true });

  const initialColumnsState = {
    [crypto.randomUUID()]: {
      name: "Queue",
      items: queueTasks,
    },
    [crypto.randomUUID()]: {
      name: "Development",
      items: developmentTasks,
    },
    [crypto.randomUUID()]: {
      name: "Done",
      items: doneTasks,
    },
  };
  const [columns, setColumns] = useState(initialColumnsState);

  const checkTasksLength = () => {
    return queueTasks.length + developmentTasks.length + doneTasks.length;
  };

  useEffect(() => {
    setColumns(initialColumnsState);
  }, [modalOpen, search]);

  useEffect(() => {
    for (const columnsKey in columns) {
      if (columns[columnsKey].name === "Queue") {
        columns[columnsKey].items.forEach((task, index) => {
          if (task.status !== "queue") {
            task.status = "queue";
            task.startDev = 0;
            task.endDate = 0;
          } else if (task.index === index) {
            return;
          }

          task.index = index;
          dispatch({
            type: TaskActionTypes.EDIT_TASK,
            payload: {
              ...task,
            },
          });
        });
      } else if (columns[columnsKey].name === "Development") {
        columns[columnsKey].items.forEach((task, index) => {
          if (task.status !== "development") {
            task.status = "development";
            task.startDev = Date.now();
            task.endDate = 0;
          } else if (task.index === index) {
            return;
          }

          task.index = index;
          dispatch({
            type: TaskActionTypes.EDIT_TASK,
            payload: {
              ...task,
            },
          });
        });
      } else {
        columns[columnsKey].items.forEach((task, index) => {
          if (task.status === "development") {
            task.workingTime = task.workingTime + (Date.now() - task.startDev);
            task.endDate = Date.now();
          } else if (task.status === "queue") {
            task.endDate = Date.now();
          } else if (task.index === index) {
            return;
          }

          task.status = "done";
          task.index = index;
          dispatch({
            type: TaskActionTypes.EDIT_TASK,
            payload: {
              ...task,
            },
          });
        });
      }
    }
  }, [columns, dispatch]);

  const getColumnName = (name: string) => {
    switch (name) {
      case "Queue":
        return "Очередь";
      case "Development":
        return "В работе";
      case "Done":
        return "Готово";
      default:
        return "";
    }
  };

  return (
    <div className={styles.boardPage}>
      <div className={styles.header}>
        <div className={styles.container}>
          <Heading tag="h1">{project?.title}</Heading>
          <Button
            icon={<PlusIcon />}
            variant="primary"
            onClick={() => setModalOpen(true)}
          >
            Добавить задачу
          </Button>
          <Button icon={<HomeIcon />} variant="ghost" onClick={goHome}>
            На главную
          </Button>
        </div>

        <div className={styles.searchWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Найти задачу"
            className={styles.searchInput}
          />
        </div>
      </div>

      {search === "" && checkTasksLength() === 0 && (
        <Heading className={styles.notify} tag="h3">
          Задач пока нет
        </Heading>
      )}
      {search !== "" && checkTasksLength() === 0 && (
        <Heading className={styles.notify} tag="h3">
          Ничего не найдено
        </Heading>
      )}

      <div className={styles.board}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div key={columnId} className={styles.column}>
                <div className={styles.columnHeader}>
                  <Heading className={styles.columnName} tag="h3">
                    {getColumnName(column.name)}
                  </Heading>
                  <div className={styles.count}>{column.items.length}</div>
                </div>
                <div>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          className={styles.columnBody}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#d7d9e0"
                              : "transparent",
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <Card
                                        style={{
                                          backgroundColor:
                                            snapshot.isDragging && "red"
                                              ? "#f9f9fd"
                                              : "#ffffff",
                                        }}
                                        id={item.id}
                                        title={item.title}
                                        priority={item.priority}
                                        description={item.description}
                                        onClick={() => {
                                          setOpenTask(item.id);
                                          setModalOpen(true);
                                        }}
                                        className={styles.taskCard}
                                      />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>

      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        removeChildren={setOpenTask}
      >
        {openTask.length ? (
          <TaskCard
            id={openTask}
            setOpenTask={setOpenTask}
            setOpen={setModalOpen}
          />
        ) : (
          <TaskForm setOpen={setModalOpen} />
        )}
      </Modal>
    </div>
  );
};

export default BoardPage;
