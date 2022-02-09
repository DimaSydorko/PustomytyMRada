import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import { Form, Formik } from 'formik'
import { SubmitButton, Input, FormItem } from "formik-antd"
import { Typography, Row, Col, Button } from 'antd'
import * as yup from 'yup'
import { AppStateType } from "../../redux/redux-store"
import { login, setIsAuth } from "../../redux/adminAuth-reducer"
import firebase from "../../Utils/firebase";

const { Title } = Typography

const validationSchema = yup.object().shape({
  password: yup.string()
    .required('якщо ви не адмін то не варто вводити пароль'),
  email: yup.string()
    .required('якщо ви не адмін то не варто вводити пошту')
})

export const AdminLogin = React.memo(() => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state:AppStateType) => state.adminAuth.isAuth)
  const loginError = useSelector((state:AppStateType) => state.adminAuth.loginError)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=> {
      user ? dispatch(setIsAuth(true)) : dispatch(setIsAuth(false))
    })
  }, [dispatch])
  
  if (isAuth) {
    return <Redirect to={"/admin/posts"}/>
  }
 
  return(
    <Formik 
      initialValues={{
        password: '',
        email: '', 
      }}
      validationSchema={validationSchema}
      onSubmit={formData => {
        dispatch(login(
          formData.email,
          formData.password,
        ))
      }}>
        {({handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <Row>
            <Title level={3}>Login</Title>
            <Col span={3}></Col>
            <Col span={4}>
              <FormItem name="email" label="Email">
                <Input name="email" placeholder="Email"/>
              </FormItem>
              <FormItem name="password" label="Password">
                <Input.Password name="password" placeholder="Password"/>
              </FormItem>
              <p>{loginError}</p>
              <div>
                <Button.Group>
                  <SubmitButton>Sign In</SubmitButton>
                </Button.Group>
              </div>
              </Col>
            </Row>
          </Form>
        )}
    </Formik>
  )
})