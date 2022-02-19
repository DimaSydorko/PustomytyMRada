import React, {useState} from 'react'
import {TextField} from "@mui/material";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {Form, Formik} from 'formik'
import * as yup from 'yup'
import usePost from "../../Hook/UsePost"
import ButtonWithModal from '../common/ButtonWIthModalSubmit/ButtonWIthModalSubmit'
import UploadFiles from "../common/UploadFiles/UploadFiles";
import MyInput from "../common/MyInput/MyInput";


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
  const { addNewPost } = usePost()
  const [newFiles, setNewFiles] = useState<Blob[] | undefined>()
  const [newImages, setNewImages] = useState<Blob[] | undefined>()
  const [newData, setNewData] = useState<string>(new Date().toDateString())

  function onchangeDataTime(date: string | null) {
    date && setNewData(date)
  }

  const onAddFile = (file: Blob) => {
    setNewFiles(value => [...(value || []), file])
  }

  const onSubmit = ({newHeader, newText}: FormType, {resetForm}: FormFunctionType) => {
    addNewPost({
      header: newHeader,
      text: newText,
      images: newImages,
      data: newData,
      files: newFiles,
    })
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
          {/*<UploadImages imgCount={5} fileList={newImages} setNewFiles={setNewImages}/>*/}
          <UploadFiles accept={'image/*'} maxUploadCount={5} onAddFile={onAddFile} files={newFiles}/>
          <ButtonWithModal header={'Підтвердіть піблікацію поста'} handleSubmit={handleSubmit}/>
        </Form>
      )}
    </Formik>
  )
}
