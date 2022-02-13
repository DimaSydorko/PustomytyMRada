import React, {useState} from "react"
import {Form, Formik} from "formik"
import * as yup from "yup"
import moment from "moment"
import {UploadFile} from "antd/lib/upload/interface"
import {Col, DatePicker, Row, Space, Typography} from "antd"
import {FormItem, Input} from "formik-antd"
import {UploadImges} from "../common/filesConfig/uploadImges"
import {useDispatch} from "react-redux"
import {addNewEvent} from "../../Hook/useEvent"
import {ButtonWithModal} from "../common/ModalSubmitingTab"
import {BlobType} from "../../Utils/types"

const {TextArea} = Input
const {Title} = Typography

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

  const [isModalVisible, setIsModalVisible] = useState(false)
  let [newImages, setNewImages] = useState<BlobType[] & UploadFile<BlobType>[]>([])
  let [newDataTime, setNewDataTime] = useState("")

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
      onSubmit={(formData, {resetForm}) => {
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
        setIsModalVisible(false)
        resetForm()
        setNewImages([])
      }}
    >
      {({handleSubmit}) => (
        <Form>
          <Title level={2}>Добавити подію:</Title>
          <Row>
            <Col span={3}/>
            <Col span={15}>
              <Space direction="vertical">
                <DatePicker
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={(current: any) => current && current < moment().endOf("day")}
                  showTime={{defaultValue: moment("12:00", "HH:mm")}}
                  onChange={(date: any, dateString: string) => setNewDataTime(dateString)}
                />
              </Space>

              <FormItem name="header">
                <Input name="header" placeholder="Заголовок події" autoComplete="off"/>
              </FormItem>
              <FormItem name="text">
                <TextArea name="text" placeholder="Опис події" autoSize={{minRows: 2}} showCount maxLength={200}/>
              </FormItem>
              <FormItem name="eventLink">
                <Input name="eventLink" placeholder="Силка на Facebook" autoComplete="off"/>
              </FormItem>
              <FormItem name="locationText">
                <Input name="locationText" placeholder="Місце проведення" autoComplete="off"/>
              </FormItem>
              <FormItem name="locationLink">
                <Input name="locationLink" placeholder="Силка на місце проведення" autoComplete="off"/>
              </FormItem>
              <FormItem name="sponsorsName">
                <Input name="sponsorsName" placeholder="Спонсори події" autoComplete="off"/>
              </FormItem>

              <UploadImges imgCount={5} fileList={newImages} setNewFiles={setNewImages}/>

              <ButtonWithModal
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                handleSubmit={handleSubmit}
              />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
