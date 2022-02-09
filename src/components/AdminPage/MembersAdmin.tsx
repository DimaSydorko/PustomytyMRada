import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { Row, Col, Typography, Select } from 'antd'
import { Input, FormItem } from "formik-antd"
import { UploadImges } from '../common/filesConfig/uploadImges'
import { compose } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ButtonWithModal } from '../common/ModalSubmitingTab'
import { UploadFile } from 'antd/lib/upload/interface'
import { BlobType, DepartmentsT } from '../../Utils/types'
import { AppStateType } from '../../redux/redux-store'
import { MemberUserPage } from '../UserPage/Members/MembersUser'
import { addNewMember } from '../../Hook/useMembers'
import {fbDatabase} from "../../Utils/firebase";
const { Title } = Typography

const validationSchema = yup.object().shape({
  FullName: yup.string()
    .required(`Учасник повинен мати ім'я`),
  InstgramLink: yup.string()
    .url('Некоректна силка'),
  FacebookLink: yup.string()
    .url('Некоректна силка'),
})

const MembersAdminPage = React.memo(() => {
  useEffect(() => {
    fbDatabase
    .ref("Department")
    .on("value", (e) => setDepartments(e.val()))
  }, [])
  const isAdmin = useSelector((state: AppStateType) => state.adminAuth.isAuth)
  const dispatch = useDispatch()
  
  const [departments, setDepartments] = useState({} as DepartmentsT)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newImg, setNewImg] = useState([] as Array<BlobType> & Array<UploadFile<BlobType>>)
  const [department, setDepartment] = useState('Chairman')

  function DepartmentSelector() {
    let selects = []
    for (let key in departments){
      //@ts-ignore
      selects.push({name: departments[key].name, key: key, header: departments[key].header})
    }
    return <FormItem name="Department" label="Спеціалізація">
      <Select
        defaultValue={selects[0].name}
        onChange={value=> setDepartment(value)}
      >
        {selects.map(e => <Select.Option value={e.name} key={e.key}>{e.header}</Select.Option>)}
      </Select>
    </FormItem>
  }

  return<>
    {
      (isAdmin && departments.Chairman) ?
      <Formik 
        initialValues={{
          FullName:'',
          InstgramLink:'',
          FacebookLink:'',
        }}
        validationSchema={validationSchema}
        onSubmit={(formData, {resetForm}) => {
          dispatch(addNewMember({
            department: department,
            fullName: formData.FullName,
            profileImg: newImg,
            instgramLink: formData.InstgramLink,
            facebookLink: formData.FacebookLink,
          }))
          setIsModalVisible(false)
          resetForm()
          setNewImg([])
        }}>

          {({handleSubmit}) => (
            <Form>
              <Title level={2}>Добавити учасника:</Title>
              <Row>
                <Col span={3}></Col>
                <Col span={15}>
                  {DepartmentSelector()}
                  <FormItem name="FullName">
                    <Input 
                      name="FullName" 
                      placeholder="Повне Ім'я"
                      autoComplete="off"
                    />
                  </FormItem>
                  <FormItem name="InstgramLink">
                    <Input 
                      name="InstgramLink" 
                      placeholder="Силка на Instgram"
                      autoComplete="off"
                    />
                  </FormItem>
                  <FormItem name="FacebookLink">
                    <Input 
                      name="FacebookLink" 
                      placeholder="Силка на Facebook"
                      autoComplete="off"
                    />
                  </FormItem>
                  <UploadImges
                    imgCount={1}
                    isCrop={true}
                    fileList={newImg}
                    setNewFiles={setNewImg}
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

    <MemberUserPage departments={departments}/>
  </>
})

export default compose<React.ComponentType>(
  withRouter,
) (MembersAdminPage)