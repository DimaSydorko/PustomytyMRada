import React from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Button } from 'antd'


type Props = {
  setIsModalVisible: (isModalVisible: boolean) => void
  handleSubmit: () => void
  isModalVisible: boolean
}
export const ButtonWithModal:React.FC<Props> = React.memo(
  ({setIsModalVisible, handleSubmit, isModalVisible}) => {
    return (
      <div>
        <Button 
          type="primary"
          onClick={() => setIsModalVisible(true)}>
            Опублікувати
        </Button>
        <Modal 
          title="Публікація"
          visible={isModalVisible} 
          onOk={()=>{
            handleSubmit()
            setIsModalVisible(false)
          }} 
          onCancel={() => setIsModalVisible(false)}>
          <p>Підтвердіть публікацію</p>
        </Modal>
      </div>
    )
  }
)