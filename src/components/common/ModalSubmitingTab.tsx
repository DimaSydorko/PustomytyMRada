import React, {useState} from 'react'
import {Button, Modal} from "@mui/material";

type Props = {
  handleSubmit: () => void
}
export default React.memo(function ButtonWithModal({handleSubmit}: Props) {
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
      >
        <div>
          <Button onClick={() => setIsModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            handleSubmit();
            setIsModal(false);
          }}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  )
})