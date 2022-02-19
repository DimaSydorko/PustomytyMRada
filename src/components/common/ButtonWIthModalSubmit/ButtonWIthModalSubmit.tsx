import React, {useState} from 'react'
import {Button, Divider, Modal} from "@mui/material";
import styles from './ButtonWIthModalSubmit.module.scss';

type Props = {
  handleSubmit: () => void;
  header: string;
  textSubmit?: string;
  submitData?: JSX.Element;
}
export default React.memo(function ButtonWithModal({handleSubmit, textSubmit, submitData, header}: Props) {
  const [isModal, setIsModal] = useState<boolean>(false);
  return (
    <div>
      <Button
        variant={'contained'}
        color={"primary"}
        onClick={() => setIsModal(true)}>
        Опублікувати
      </Button>
      <Modal
        open={isModal}
        onClose={() => setIsModal(false)}
        aria-labelledby="Публікація"
        aria-describedby="Підтвердіть публікацію"
        className={styles.modal}
      >
        <div className={styles.container}>
          <div className={styles.textHeader}>{header}</div>
          <Divider/>
          <div className={styles.content}>
            {textSubmit || null}
            {submitData || null}
          </div>
          <Divider/>
          <div className={styles.containerButtons}>
            <Button onClick={() => setIsModal(false)}>
              Скасувати
            </Button>
            <Button
              variant={'contained'}
              type={'submit'}
              onClick={() => {
                handleSubmit();
                setIsModal(false);
              }}>
              Підтвердити
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
})