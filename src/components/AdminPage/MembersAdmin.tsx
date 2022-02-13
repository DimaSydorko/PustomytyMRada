import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Form, Formik} from 'formik'
import * as yup from 'yup'
import {Col, Row, Select, Typography} from 'antd'
import {FormItem, Input} from "formik-antd"
import {UploadFile} from 'antd/lib/upload/interface'
import {addNewMember} from '../../Hook/useMembers'
import {ButtonWithModal} from '../common/ModalSubmitingTab'
import {UploadImges} from '../common/filesConfig/uploadImges'
import {fbDatabase} from "../../Utils/firebase";
import {BlobType, DepartmentsT} from '../../Utils/types'

const {Title} = Typography

const validationSchema = yup.object().shape({
  FullName: yup.string()
    .required('Учасник повинен мати ім`я'),
  InstagramLink: yup.string()
    .url('Некоректна силка'),
  FacebookLink: yup.string()
    .url('Некоректна силка'),
})

export default function MembersAdminPage() {
  const dispatch = useDispatch()
  const [departments, setDepartments] = useState({} as DepartmentsT)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newImg, setNewImg] = useState([] as Array<BlobType> & Array<UploadFile<BlobType>>)
  const [department, setDepartment] = useState('Chairman')

  useEffect(() => {
    fbDatabase
      .ref("Department")
      .on("value", (e) => setDepartments(e.val()))
  }, [])

  function DepartmentSelector() {
    let selects = []
    for (let key in departments) {
      //@ts-ignore
      selects.push({name: departments[key].name, key: key, header: departments[key].header})
    }
    return <FormItem name="Department" label="Спеціалізація">
      <Select
        defaultValue={selects[0].name}
        onChange={value => setDepartment(value)}
      >
        {selects.map(e => <Select.Option value={e.name} key={e.key}>{e.header}</Select.Option>)}
      </Select>
    </FormItem>
  }

  return <>
    {
      (departments.Chairman) &&
      <Formik
        initialValues={{
          FullName: '',
          InstagramLink: '',
          FacebookLink: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(formData, {resetForm}) => {
          dispatch(addNewMember({
            department: department,
            fullName: formData.FullName,
            profileImg: newImg,
            instagramLink: formData.InstagramLink,
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
              <Col span={3}/>
              <Col span={15}>
                {DepartmentSelector()}
                <FormItem name="FullName">
                  <Input
                    name="FullName"
                    placeholder="Повне Ім`я"
                    autoComplete="off"
                  />
                </FormItem>
                <FormItem name="InstagramLink">
                  <Input
                    name="InstagramLink"
                    placeholder="Силка на Instagram"
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
    }
  </>
}