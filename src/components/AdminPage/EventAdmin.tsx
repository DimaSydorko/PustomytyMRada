import React, { useState } from "react"
import { Form, Formik } from "formik"
import * as yup from "yup"
import { UploadImges } from "../common/filesConfig/uploadImges"
import { compose } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import { addNewEvent } from "../../Hook/useEvent"
import { EventUserPage } from "../UserPage/Events/EventUser"
import { Input, FormItem } from "formik-antd"
import { Row, Col, Typography, Space, DatePicker } from "antd"
import moment from "moment"
import { ButtonWithModal } from "../common/ModalSubmitingTab"
import { UploadFile } from "antd/lib/upload/interface"
import { BlobType } from "../../Utils/types"
import { AppStateType } from "../../redux/redux-store"

const { TextArea } = Input
const { Title } = Typography

const validationSchema = yup.object().shape({
  header: yup
    .string()
    .required("Подія повина містити заголовок")
    .max(50, "Надто довга назва"),
  text: yup.string().required("Подія повина містити опис"),
  eventlink: yup.string().url("Некоректна силка").nullable(),
  locationText: yup.string().required("Потрібно вказати місце поведення"),
  locationLink: yup
    .string()
    .required("Потрібно дати силку на місце проведення")
    .url("Некоректна силка"),
  sponsorsName: yup.string().nullable(),
})

const EventAdminPage = React.memo(() => {
  const isAdmin = useSelector((state: AppStateType) => state.adminAuth.isAuth)
  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false)
  let [newImges, setNewImges] = useState(
    [] as Array<BlobType> & Array<UploadFile<BlobType>>
  )
  let [newDataTime, setnewDataTime] = useState("")

  return (
    <>
      {isAdmin ? (
        <Formik
          initialValues={{
            header: "",
            text: "",
            sponsorsName: "",
            eventlink: "",
            locationText: "",
            locationLink: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(formData, { resetForm }) => {
            dispatch(
              addNewEvent({
                header: formData.header,
                text: formData.text,
                dataTime: newDataTime,
                link: formData.eventlink,
                location: {
                  text: formData.locationText,
                  link: formData.locationLink,
                },
                sponsors: {
                  name: formData.sponsorsName,
                  images: newImges,
                },
              })
            )
            setIsModalVisible(false)
            resetForm()
            setNewImges([])
          }}
        >
          {({ handleSubmit }) => (
            <Form>
              <Title level={2}>Добавити подію:</Title>
              <Row>
                <Col span={3}></Col>
                <Col span={15}>
                  <Space direction="vertical">
                    <DatePicker
                      format="YYYY-MM-DD HH:mm"
                      disabledDate={(current: any) => current && current < moment().endOf("day")}
                      showTime={{ defaultValue: moment("12:00", "HH:mm") }}
                      onChange={(date: any, dateString: string) => setnewDataTime(dateString)}
                    />
                  </Space>
                  
                  <FormItem name="header">
                    <Input name="header" placeholder="Заголовок події" autoComplete="off"/>
                  </FormItem>
                  <FormItem name="text">
                    <TextArea name="text" placeholder="Опис події" autoSize={{ minRows: 2 }} showCount maxLength={200}/>
                  </FormItem>
                  <FormItem name="eventlink">
                    <Input name="eventlink" placeholder="Силка на Facebook" autoComplete="off"/>
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

                  <UploadImges imgCount={5} fileList={newImges} setNewFiles={setNewImges}/>

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
      ) : null}
      <EventUserPage />
    </>
  )
})

export default compose<React.ComponentType>(withRouter)(EventAdminPage)