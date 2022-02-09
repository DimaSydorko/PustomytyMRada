import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { Row, Col, Typography, Space, DatePicker } from 'antd'
import { Input, FormItem } from "formik-antd"
import { UploadImges } from '../common/filesConfig/uploadImges'
import { compose } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addNewPost } from "../../Hook/usePost"
import { ButtonWithModal } from '../common/ModalSubmitingTab'
import { UploadFiles } from '../common/filesConfig/uploadFiles'
import { UploadFile } from 'antd/lib/upload/interface'
import moment from 'moment'
import { BlobType } from '../../Utils/types'
import { AppStateType } from '../../redux/redux-store'
import { PostUserPage } from '../UserPage/Posts/PostsUser'

const { TextArea } = Input
const { Title } = Typography

const validationSchema = yup.object().shape({
  newHeader: yup.string()
    .required('Пост повинен містити заголовок'),
  newText: yup.string()
    .required('Пост повинен містити текст'),
})

const PostAdminPage = React.memo(() => {
  const isAdmin = useSelector((state:AppStateType) => state.adminAuth.isAuth)
  const dispatch = useDispatch()
  
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newFiles, setNewFiles] = useState([] as Array<BlobType> & Array<UploadFile<BlobType>>)
  const [newImges, setNewImges] = useState([] as Array<BlobType> & Array<UploadFile<BlobType>>)
  let [newData, setNewData] = useState('')
  
  function disabledDate(current: any) {return current && current > moment().endOf('day')}
  function onchangeDataTime(date: any, dateString: string) {setNewData(dateString)}
  return(
    <div>
      {
        isAdmin ? 
        <Formik
          initialValues={{newText:'', newHeader:''}}
          validationSchema={validationSchema}
          onSubmit={(formData, {resetForm}) => {
            if (!newData) newData = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+ new Date().getDate()
            dispatch(addNewPost({
              Header: formData.newHeader,
              Text: formData.newText,
              Images: newImges,
              Data: newData,
              Files: newFiles,
            }))
            setIsModalVisible(false)
            resetForm()
            setNewFiles([])
            setNewImges([])
          }}>
            
            {({handleSubmit}) => (
              <Form>
                
                <Title level={2}>Написати пост:</Title>
                <Row>
                  <Col span={3}></Col>
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
                        autoSize={{ minRows: 2}} 
                        showCount
                        />
                    </FormItem>
                    <UploadImges
                      imgCount={5}
                      fileList={newImges}
                      setNewFiles={setNewImges}
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
        : null 
      }
      <PostUserPage/>
    </div>
  )
})


export default compose<React.ComponentType>(
  withRouter,
) (PostAdminPage)