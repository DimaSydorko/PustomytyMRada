import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Col, DatePicker, Row, Space, Typography} from 'antd'
import {Form, Formik} from 'formik'
import {FormItem, Input} from "formik-antd"
import * as yup from 'yup'
import moment from 'moment'
import {UploadImges} from '../common/filesConfig/uploadImges'
import {addNewPost} from "../../Hook/usePost"
import {ButtonWithModal} from '../common/ModalSubmitingTab'
import {UploadFiles} from '../common/filesConfig/uploadFiles'
import {UploadFile} from 'antd/lib/upload/interface'
import {BlobType} from '../../Utils/types'

const {TextArea} = Input
const {Title} = Typography

const validationSchema = yup.object().shape({
  newHeader: yup.string()
    .required('Пост повинен містити заголовок'),
  newText: yup.string()
    .required('Пост повинен містити текст'),
})

export default function PostAdminPage() {
  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newFiles, setNewFiles] = useState([] as Array<BlobType> & Array<UploadFile<BlobType>>)
  const [newImages, setNewImages] = useState([] as Array<BlobType> & Array<UploadFile<BlobType>>)
  let [newData, setNewData] = useState('')

  function disabledDate(current: any) {
    return current && current > moment().endOf('day')
  }

  function onchangeDataTime(date: any, dateString: string) {
    setNewData(dateString)
  }

  return (
    <Formik
      initialValues={{newText: '', newHeader: ''}}
      validationSchema={validationSchema}
      onSubmit={(formData, {resetForm}) => {
        if (!newData) newData = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
        dispatch(addNewPost({
          Header: formData.newHeader,
          Text: formData.newText,
          Images: newImages,
          Data: newData,
          Files: newFiles,
        }))
        setIsModalVisible(false)
        resetForm()
        setNewFiles([])
        setNewImages([])
      }}>

      {({handleSubmit}) => (
        <Form>

          <Title level={2}>Написати пост:</Title>
          <Row>
            <Col span={3}/>
            <Col span={15}>
              <Space direction="vertical">
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disabledDate}
                  onChange={onchangeDataTime}
                />
              </Space>
              <FormItem name="newHeader">
                <Input
                  name="newHeader"
                  placeholder="Заголовок для поста"
                  autoComplete="off"
                />
              </FormItem>
              <FormItem name="newText">
                <TextArea
                  name="newText"
                  placeholder="Тут ви можете написати новий пост..."
                  autoSize={{minRows: 2}}
                  showCount
                />
              </FormItem>
              <UploadImges
                imgCount={5}
                fileList={newImages}
                setNewFiles={setNewImages}
              />
              <UploadFiles
                maxUploadCount={5}
                fileList={newFiles}
                setNewFiles={setNewFiles}
              />
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
