import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Form, Formik, FormikValues} from 'formik'
import * as yup from 'yup'
import {Select} from 'antd'
import {FormItem} from "formik-antd"
import {UploadFile} from 'antd/lib/upload/interface'
import {addNewMember} from '../../Hook/useMembers'
import ButtonWithModal from '../common/ModalSubmitingTab'
import UploadImages from '../common/filesConfig/UploadImages'
import MyInput from "../common/MyInput/MyInput";
import {fbDatabase} from "../../Utils/firebase";
import {BlobType, DepartmentsT} from '../../Utils/types'

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

  const onSubmit = (formData: FormikValues, {resetForm}: { resetForm: () => void }) => {
    dispatch(addNewMember({
      department: department,
      fullName: formData.FullName,
      profileImg: newImg,
      instagramLink: formData.InstagramLink,
      facebookLink: formData.FacebookLink,
    }))
    resetForm()
    setNewImg([])
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
        onSubmit={onSubmit}
      >
        {
          ({handleSubmit}) => (
            <Form>
              <h1>Додати учасника:</h1>
              {DepartmentSelector()}
              <MyInput name={"FullName"} placeholder={"Повне Ім`я"}/>
              <MyInput name={"InstagramLink"} placeholder={"Силка на Instagram"}/>
              <MyInput name={"FacebookLink"} placeholder={"Силка на Facebook"}/>
              <UploadImages imgCount={1} isCrop={true} fileList={newImg} setNewFiles={setNewImg}/>
              <ButtonWithModal handleSubmit={handleSubmit}/>
            </Form>
          )
        }
      </Formik>
    }
  </>
}