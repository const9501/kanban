import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";
import { ReactComponent as PlusIcon } from "../../assets/plusIcon.svg";
import styles from "./HomePage.module.scss";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import React, { useEffect, useRef, useState } from "react";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Link } from "react-router-dom";
import { selectProjects } from "../../store/selectors/projectSelectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ProjectActionTypes } from "../../store/reducers/projectReducer";
import { TaskActionTypes } from "../../store/reducers/taskReducer";

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const ref = useRef<HTMLElement>();
  const [clickCoords, setClickCoords] = useState<DOMRect>();

  const handleClickWithCoords = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setModalOpen(true);
    ref.current = event.target as HTMLElement;
    setClickCoords(ref.current.getBoundingClientRect());
  };

  const projects = useAppSelector(selectProjects);

  const deleteProject = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
    title?: string,
  ) => {
    event.preventDefault();
    if (
      window.confirm(
        `Подтвердите удаление проекта "${title}".\nТакже будут удалены все задачи по проекту.`,
      )
    ) {
      dispatch({ type: ProjectActionTypes.REMOVE_PROJECT, payload: id });
      dispatch({ type: TaskActionTypes.REMOVE_ALL_PROJ_TASKS, payload: id });
    }
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <Heading tag="h1">Проекты</Heading>
        <Button
          icon={<PlusIcon />}
          variant="primary"
          onClick={handleClickWithCoords}
        >
          Добавить проект
        </Button>
      </div>

      <div className={styles.board}>
        {projects.length ?
          projects.map((proj) => (
            <Link className={styles.link} to={proj.id} key={proj.id}>
              <Card
                onDelete={deleteProject}
                id={proj.id}
                title={proj.title}
                description={proj.description}
                className={styles.card}
              />
            </Link>
          )) :
            <Heading tag='h3'>Проектов пока нет</Heading>
        }
      </div>

      <Modal
        initialCoords={clickCoords}
        open={modalOpen}
        setOpen={setModalOpen}
      >
        <ProjectForm setOpen={setModalOpen} />
      </Modal>
    </div>
  );
};

export default HomePage;
