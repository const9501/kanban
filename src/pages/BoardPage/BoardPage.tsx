import Heading from "../../components/Heading/Heading";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import styles from "./BoardPage.module.scss";
import Button from "../../components/Button/Button";
import React, {useEffect, useState} from "react";
import {ReactComponent as PlusIcon} from "../../assets/plusIcon.svg"
import {ReactComponent as HomeIcon} from "../../assets/homeIcon.svg"
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd'
import {TaskActionTypes} from "../../store/reducers/taskReducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import Modal from "../../components/Modal/Modal";
import TaskForm from "../../components/TaskForm/TaskForm";
import {selectDevelopmentTasks, selectDoneTasks, selectQueueTasks} from "../../store/selectors/taskSelectors";
import Card from "../../components/Card/Card";
import {shallowEqual} from "react-redux";
import TaskCard from "../../components/TaskCard/TaskCard";


// TODO REMOVE ANY TYPE

const BoardPage = () => {

  const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {

    if (!result.destination) return;
    const {source, destination} = result;

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
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
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
          items: copiedItems
        }
      });

    }
  };


  const {id} = useParams()
  const dispatch = useAppDispatch()
  const queueTasks = useAppSelector(state => selectQueueTasks(state, id), shallowEqual)
  const developmentTasks = useAppSelector(state => selectDevelopmentTasks(state, id))
  const doneTasks = useAppSelector(state => selectDoneTasks(state, id))
  const [modalOpen, setModalOpen] = useState(false)
  const [openTask, setOpenTask] = useState('')

  const navigate = useNavigate()
  const goHome = () => navigate('/', {replace: true})

  const initialColumnsState = {
    [crypto.randomUUID()]: {
      name: "Queue",
      items: queueTasks
    },
    [crypto.randomUUID()]: {
      name: "Development",
      items: developmentTasks
    },
    [crypto.randomUUID()]: {
      name: "Done",
      items: doneTasks
    },
  }

  const [columns, setColumns] = useState(initialColumnsState);
  useEffect(() => {
    setColumns(initialColumnsState)
  }, [modalOpen]);

  useEffect(() => {

    for (const columnsKey in columns) {

      if (columns[columnsKey].name === 'Queue') {
        columns[columnsKey].items.forEach((task, index) => {
          dispatch({type: TaskActionTypes.EDIT_TASK, payload: {...task, status: 'queue', index: index, endDate: 0}})
        })
      } else if (columns[columnsKey].name === 'Development') {
        columns[columnsKey].items.forEach((task, index) => {
          if (task.status === 'queue') {
            dispatch({
              type: TaskActionTypes.EDIT_TASK,
              payload: {...task, status: 'development', index: index, endDate: 0}
            })
          }
          dispatch({
            type: TaskActionTypes.EDIT_TASK,
            payload: {...task, status: 'development', index: index, endDate: 0}
          })
        })
      } else {
        columns[columnsKey].items.forEach((task, index) => {
          if (task.status !== 'done') {
            dispatch({type: TaskActionTypes.EDIT_TASK,
              payload: {
                ...task,
                status: 'done',
                index: index,
                endDate: Date.now(),
              }
            })
          } else {
            dispatch({type: TaskActionTypes.EDIT_TASK, payload: {...task, status: 'done', index: index}})
          }

        })
      }


    }

  }, [columns, dispatch])

  return (
    <div className={styles.boardPage}>

      <div className={styles.header}>
        <Heading tag='h1'>Проект {id}</Heading>
        <Button
          icon={<PlusIcon/>}
          variant='primary'
          onClick={() => setModalOpen(true)}
        >
          Добавить задачу
        </Button>
        <Button
          icon={<HomeIcon/>}
          variant='ghost'
          onClick={goHome}
        >
          На главную
        </Button>
      </div>

      <div className={styles.board}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                key={columnId}
                className={styles.column}
              >
                <div className={styles.columnHeader}>
                  <Heading className={styles.columnName} tag='h3'>{column.name}</Heading>
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
                                        ...provided.draggableProps.style
                                      }}
                                    >

                                      <Card
                                        style={{
                                          backgroundColor: snapshot.isDragging && "red"
                                            ? "#f9f9fd"
                                            : "#ffffff",
                                        }}
                                        title={item.title}
                                        priority={item.priority}
                                        description={item.description}
                                        onClick={() => {
                                          setOpenTask(item.id)
                                          setModalOpen(true)
                                        }}
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


      <Modal open={modalOpen} setOpen={setModalOpen} removeChildren={setOpenTask}>
        {
          openTask.length ? <TaskCard id={openTask} setOpenTask={setOpenTask} setOpen={setModalOpen}/> :
            <TaskForm setOpen={setModalOpen}/>
        }

      </Modal>

    </div>
  );
}

export default BoardPage;