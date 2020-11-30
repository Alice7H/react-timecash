import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import TextError from "../TextError";
import DatePicker from "react-datepicker";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context";
import "../../styles/Form.css";
import { Container, Col, Row } from "react-bootstrap";
import ServiceProducts from "../services/ServiceProducts";

export default function ServiceEdit(props) {
    const { id } = useParams();
    const { user, updateService } = useAuth();

    const note = user.notes[id];
    const service = note.service;

    const updateValues = {
        startTime: new Date(service.startTime),
        endTime: service.endTime,
        name: service.name,
        serviceHour: service.serviceHour,
        travelCost: service.travelCost,
        otherCost: service.otherCost,
    };

    const validationSchema = yup.object({
        endTime: yup
            .date("Invalid date")
            .min(
                updateValues.startTime,
                "It must be greater than the start time"
            )
            .required("End time is required"),
        name: yup.string().required("Name is required"),
        serviceHour: yup
            .number()
            .min(0.1, "Minimum 0.1")
            .required("Service hour is required"),
        travelCost: yup
            .number()
            .min(0, "Minimum 0")
            .required("Travel Cost is required"),
        otherCost: yup.string().min(0, "Minimum 0"),
    });

    const onSubmit = (data) => {
        data.id = id;
        updateService(data);
        props.history.push("/user");
    };

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <ServiceProducts products={note.products} id={id} />
                <Col sm>
                    <Formik
                        initialValues={updateValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {(formik) => {
                            return (
                                <div className='text-center my-2'>
                                    <h1> Edit Service</h1>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <div className='form-control'>
                                            <label htmlFor='startTime'>                                       
                                                Start time
                                            </label>
                                            <Field name='startTime'>
                                                {({ form, field }) => {
                                                    const {
                                                        setFieldValue,
                                                    } = form;
                                                    const { value } = field;
                                                    return (
                                                        <DatePicker
                                                            id='startTime'
                                                            type='date'
                                                            selected={value}
                                                            disabled
                                                            dateFormat='dd/MM/yyyy HH:mm:ss'
                                                            onChange={(val) =>
                                                                setFieldValue(
                                                                    "startTime",
                                                                    val
                                                                )
                                                            }
                                                        />
                                                    );
                                                }}
                                            </Field>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='endTime'>
                                                {" "}
                                                End time
                                            </label>
                                            <Field name='endTime'>
                                                {({ form, field }) => {
                                                    const {
                                                        setFieldValue,
                                                    } = form;
                                                    const { value } = field;
                                                    return (
                                                        <DatePicker
                                                            id='endTime'
                                                            type='date'
                                                            minDate={
                                                                form.values
                                                                    .startTime
                                                            }
                                                            selected={value}
                                                            {...field}
                                                            showTimeSelect
                                                            timeFormat='HH:mm:ss'
                                                            dateFormat='dd/MM/yyyy HH:mm:ss'
                                                            popperPlacement='top-end'
                                                            onChange={(val) =>
                                                                setFieldValue(
                                                                    "endTime",
                                                                    val
                                                                )
                                                            }
                                                        />
                                                    );
                                                }}
                                            </Field>
                                            <ErrorMessage
                                                name='endTime'
                                                component={TextError}
                                            />
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='name'>
                                                {" "}
                                                Service name
                                            </label>
                                            <Field
                                                type='text'
                                                id='name'
                                                name='name'
                                            />
                                            <ErrorMessage
                                                name='name'
                                                component={TextError}
                                            />
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='serviceHour'>
                                                {" "}
                                                Service per hour{" "}
                                            </label>
                                            <Field
                                                type='number'
                                                id='serviceHour'
                                                name='serviceHour'
                                            />
                                            <ErrorMessage
                                                name='serviceHour'
                                                component={TextError}
                                            />
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='travelCost'>
                                                {" "}
                                                Travel cost{" "}
                                            </label>
                                            <Field
                                                type='number'
                                                id='travelCost'
                                                name='travelCost'
                                            />
                                            <ErrorMessage
                                                name='travelCost'
                                                component={TextError}
                                            />
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='otherCost'>
                                                {" "}
                                                Other cost
                                            </label>
                                            <Field
                                                type='number'
                                                id='otherCost'
                                                name='otherCost'
                                            />
                                            <ErrorMessage
                                                name='otherCost'
                                                component={TextError}
                                            />
                                        </div>

                                        <button
                                            type='submit'
                                            disabled={
                                                !(
                                                    formik.isValid &&
                                                    formik.dirty
                                                ) || formik.isSubmitting
                                            }
                                        >
                                            Complete Service
                                        </button>
                                        <Link to="/user">
                                            <button> Back to note list</button>
                                        </Link>
                                    </Form>
                                </div>
                            );
                        }}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}
