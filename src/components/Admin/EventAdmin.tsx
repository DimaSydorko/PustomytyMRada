import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {Form, Formik, FormikValues} from "formik"
import * as yup from "yup"
import {TextField} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {UploadFile} from "antd/lib/upload/interface"
import {addNewEvent} from "../../Hook/useEvent"
import ButtonWithModal from "../common/ModalSubmitingTab"
import UploadImages from "../common/filesConfig/UploadImages"
import MyInput from "../common/MyInput/MyInput";
import {BlobType} from "../../Utils/types"

const validationSchema = yup.object().shape({
  header: yup
    .string()
    .required("Подія повина містити заголовок")
    .max(50, "Надто довга назва"),
  text: yup.string().required("Подія повина містити опис"),
  eventLink: yup.string().url("Некоректна силка").nullable(),
  locationText: yup.string().required("Потрібно вказати місце поведення"),
  locationLink: yup
    .string()
    .required("Потрібно дати силку на місце проведення")
    .url("Некоректна силка"),
  sponsorsName: yup.string().nullable(),
})

export default function EventAdmin() {
  const dispatch = useDispatch()
  let [newImages, setNewImages] = useState<BlobType[] & UploadFile<BlobType>[]>([])
  let [newDataTime, setNewDataTime] = useState<string>(new Date().toDateString())

  const onSubmit = (formData: FormikValues, {resetForm}: { resetForm: () => void }) => {
    dispatch(
      addNewEvent({
        header: formData.header,
        text: formData.text,
        dataTime: newDataTime,
        link: formData.eventLink,
        location: {
          text: formData.locationText,
          link: formData.locationLink,
        },
        sponsors: {
          name: formData.sponsorsName,
          images: newImages,
        },
      })
    )
    resetForm()
    setNewImages([])
  }

  return (
    <Formik
      initialValues={{
        header: "",
        text: "",
        sponsorsName: "",
        eventLink: "",
        locationText: "",
        locationLink: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({handleSubmit}) => (
        <Form>
          <h2>Створити нову подію:</h2>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={newDataTime}
            disablePast
            onChange={date => date && setNewDataTime(date)}
            renderInput={(params) => <TextField {...params} />}
          />
          <MyInput name={'header'} placeholder={"Заголовок події"}/>
          <MyInput name={'text'} type={'textarea'} placeholder={"Опис події"} maxLength={200}/>
          <MyInput name={'eventLink'} placeholder={"Силка на Facebook"}/>
          <MyInput name={'locationText'} placeholder={"Місце проведення"}/>
          <MyInput name={'locationLink'} placeholder={"Силка на місце проведення"}/>
          <MyInput name={'sponsorsName'} placeholder={"Спонсори події"}/>

          <UploadImages imgCount={5} fileList={newImages} setNewFiles={setNewImages}/>

          <ButtonWithModal handleSubmit={handleSubmit}/>
        </Form>
      )}
    </Formik>
  )
}
