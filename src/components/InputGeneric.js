import React from 'react';
import { FormGroup, Form, Col } from "react-bootstrap";
import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";

export default function InputGeneric(props) {
    const {value, type, label, md, placeholder} = props;
    return (
        <FormGroup as={Col} md={md} >
            <Form.Label htmlFor={value}>{label}</Form.Label>
            <Field className="form-control" type={type} id={value} name={value} placeholder={placeholder} autoComplete="off"/>
            <ErrorMessage name={value} component={TextError} />
        </FormGroup>
    )
}
