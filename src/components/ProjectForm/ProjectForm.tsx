import styles from "./ProjectForm.module.scss";
import Heading from "../Heading/Heading";
import Input from "../Input/Input";
import Button from "../Button/Button";
import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ProjectActionTypes } from "../../types/types";

const ProjectForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [inputError, setInputError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      dispatch({
        type: ProjectActionTypes.ADD_PROJECT,
        payload: {
          id: crypto.randomUUID(),
          title: title,
          description: description,
        },
      });

      setTitle("");
      setDescription("");
      setInputError(false);
      setOpen(false);
    } else {
      setTitle("");
      setInputError(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Heading tag="h2">Новый проект</Heading>
      <Input
        error={inputError}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Название проекта*"
      />
      <Input
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Краткое описание"
      />
      <Button type="submit" variant="primary">
        Создать
      </Button>
    </form>
  );
};

export default ProjectForm;
