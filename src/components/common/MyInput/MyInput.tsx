import React, {ClassAttributes, TextareaHTMLAttributes} from "react";
import {Field, useField} from "formik";
import {TextareaAutosize} from "@mui/material";
import clsx from "clsx";
import styles from './myInput.module.scss';

interface MyInputType {
  name: string;
  type?: 'input' | 'textarea' | 'email' | 'password';
  className?: string;
  maxLength?: number;
}

export default function MyInput(
  props: MyInputType & ClassAttributes<HTMLTextAreaElement> & TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  const [field, meta] = useField(props);
  const {type = 'input', autoComplete = 'off', className} = props;
  const isError = meta.touched && meta.error;

  return (
    <div className={styles.container}>
      {type === 'textarea' ? (
        <TextareaAutosize
          {...field}
          autoComplete={autoComplete}
          minRows={2}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          className={clsx(styles.input, styles.textArea, {[styles.inputError]: isError}, className)}
        />
      ) : (
        <Field
          {...field}
          autoComplete={autoComplete}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          className={clsx(styles.input, {[styles.inputError]: isError}, className)}
        />
      )}
      {isError && (
        <div className={styles.error}>{meta.error}</div>
      )}
    </div>
  )
}