import React from 'react'
import { Popconfirm } from 'antd'
import {Button} from "@mui/material";

type PropsType = {
  title: string,
  confirmTitle: string,
  funcToCompleate: () => void
}

const ConfirmButton:React.FC<PropsType> = ({title, confirmTitle, funcToCompleate}) => {
  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)
    
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      funcToCompleate()
      setConfirmLoading(false)
    }, 2000)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const deletePostFunc = () => {
    setVisible(true)
  }
  
  return (
    <div>
      <Popconfirm
        title={confirmTitle}
        visible={visible}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        <Button
          color={"error"}
          variant={'outlined'}
          onClick={()=>deletePostFunc()}>
          {title}
        </Button>
      </Popconfirm>
    </div>
  )
}

export default ConfirmButton