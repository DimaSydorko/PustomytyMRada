import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {TextField} from "@mui/material";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {Form, Formik} from 'formik'
import * as yup from 'yup'
import {UploadFile} from 'antd/lib/upload/interface'
import {addNewPost} from "../../Hook/usePost"
import UploadImages from '../common/filesConfig/UploadImages'
import ButtonWithModal from '../common/ModalSubmitingTab'
import UploadFiles from "../common/filesConfig/UploadFiles";
import MyInput from "../common/MyInput/MyInput";
import {BlobType} from '../../Utils/types'


const validationSchema = yup.object().shape({
  newHeader: yup.string()
    .required('Пост повинен містити заголовок'),
  newText: yup.string()
    .required('Пост повинен містити текст'),
})

type FormType = {
  newHeader: string;
  newText: string;
}
type FormFunctionType = {
  resetForm: () => void;
}

export default function PostAdminPage() {
  const dispatch = useDispatch()

  const [newFiles, setNewFiles] = useState<BlobType[] & UploadFile<BlobType>[]>([])
  const [newImages, setNewImages] = useState<BlobType[] & UploadFile<BlobType>[]>([])
  const [newData, setNewData] = useState<string>(new Date().toDateString())

  function onchangeDataTime(date: string | null) {
    date && setNewData(date)
  }

  const onSubmit = ({newHeader, newText}: FormType, {resetForm}: FormFunctionType) => {
    dispatch(addNewPost({
      Header: newHeader,
      Text: newText,
      Images: newImages,
      Data: newData,
      Files: newFiles,
    }))
    resetForm()
    setNewFiles([])
    setNewImages([])
  }

  return (
    <Formik
      initialValues={{newText: '', newHeader: ''}}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({handleSubmit}) => (
        <Form>
          <h2>Написати пост:</h2>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={newData}
            disableFuture
            onChange={onchangeDataTime}
            renderInput={(params) => <TextField {...params} />}
          />
          <MyInput name="newHeader" placeholder="Заголовок для поста"/>
          <MyInput type='textarea' name="newText" contentEditable placeholder="Тут ви можете написати новий пост..."/>
          <UploadImages imgCount={5} fileList={newImages} setNewFiles={setNewImages}/>
          <UploadFiles maxUploadCount={5} fileList={newFiles} setNewFiles={setNewFiles}/>
          <ButtonWithModal handleSubmit={handleSubmit}/>
        </Form>
      )}
    </Formik>
  )
}
