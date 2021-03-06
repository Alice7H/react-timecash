import React from 'react'
import DatePicker from "react-datepicker";
import {FormGroup, Form, Col } from "react-bootstrap";
import { Field } from "formik";
import "../styles/DataPicker.css";

export default function InputDataPicker(props) {

    const { value, label, md, disabled } = props;

    return (
        <FormGroup as={Col} md={md}>
            <Form.Label htmlFor={value}>{ label } </Form.Label>
            <Field name={value}>
                {({ form, field }) => {
                    const {setFieldValue} = form;
                  
                    return (
                        disabled 
                        ? 
                        <DatePicker
                            id={value}
                            type='date'
                            selected={field.value}
                            disabled
                            className="form-control"
                            dateFormat='dd/MM/yyyy HH:mm:ss'
                            onChange={(val) => setFieldValue( {value}, val)}
                        />
                        :
                        <DatePicker 
                            id={value}
                            type='date'
                            selected={field.value}
                            className="form-control"
                            minDate={form.values.startTime}
                            showTimeSelect
                            popperPlacement='top-end'
                            timeFormat='HH:mm:ss'
                            dateFormat='dd/MM/yyyy HH:mm:ss'
                            onChange={(val)=> {setFieldValue(value, val)}}
                        />
                    );
                }}
            </Field>
        </FormGroup>
    )
}

