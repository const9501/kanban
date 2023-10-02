import styles from './NotFoundPage.module.scss';
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate()

  const goHome = () => navigate("/", { replace: true });


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Heading tag='h3'>Страница не найдена</Heading>
        <Button onClick={goHome} variant='primary'>На главную</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;