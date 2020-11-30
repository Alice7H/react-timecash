import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import TextError from "./components/TextError";
import DatePicker from "react-datepicker";
import { Container } from "react-bootstrap";
import '../../styles/Form.css';
// import { Link } from 'react-router-dom';

export default function Service(props) {

    const initialValues = {
        id: "",
        startTime: new Date(),
        endTime:"",
        name: "New Service",
        serviceHour: "",
        travelCost: "",
        otherCost: "",
        totalValue: "",
    }

    const validationSchema = yup.object({
        id: yup.number(),
        startTime: yup.date(),
        name: yup.string().min(5, "Minimum 5 characters").max(50, "Maximum 50 characters").required("Service name is required"),
        serviceHour: yup.string().required("Service per Hour is required"),
        travelCost: yup.string().required("Travel cost is required"),
        otherCost: yup.string().nullable(),
        totalValue: yup.string(),
    })

    const onSubmit = (values) => {
        const totalValue = calculate(values);
        values.totalValue = totalValue;
        values.status = "in progress";
        console.log("Form data", values);
    }

    const calculate = (values) => {
        let miliseconds =  values.endTime.getTime() - values.startTime.getTime();
        let hour = (miliseconds / 3600000);
        let priceHour = values.serviceHour * hour;
        priceHour = parseFloat(priceHour.toFixed(2));
        let travelCost = parseFloat(values.travelCost);
        let otherCost = parseFloat( values.otherCost);
        return (travelCost + otherCost + priceHour).toFixed(2);
    }

    return (
        <Formik 
            initialValues={initialValues }
            validationSchema={validationSchema}
            onSubmit={onSubmit}    
        >
            { formik => {
                return( 
                    <Container className="text-center my-2">
                        <h1>Service</h1>
                        <Form onSubmit={formik.handleSubmit}>
                            <div className="form-control">
                                <label htmlFor="startTime"> Start time</label>
                                <Field name="startTime">
                                {({form, field}) => {
                                    const {setFieldValue} = form
                                    const {value} = field
                                    return (
                                        <DatePicker  
                                            id="startTime"
                                            type="date"
                                            selected={value}
                                            disabled
                                            dateFormat='HH:mm:ss' 
                                            onChange={val => setFieldValue("startTime", val)}
                                        />
                                    )
                                }}
                                </Field>
                            </div>
                            <div className="form-control">
                                <label htmlFor="endTime"> End time</label>
                                <Field name="endTime">
                                {({form, field}) => {
                                    const {setFieldValue} = form
                                    const {value} = field                      
                                    return (
                                        <DatePicker  
                                            id="endTime"
                                            type="date"
                                            minDate={form.values.startTime}                                                    
                                            selected={value}
                                            {...field} 
                                            showTimeSelect
                                            timeFormat="HH:mm:ss"
                                            dateFormat='HH:mm:ss'  
                                            popperPlacement="top-end"                            
                                            onChange={val => setFieldValue("endTime", val)}
                                        />
                                    )
                                    }}
                                </Field>
                                <ErrorMessage name="endTime" component={TextError} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="name"> Service name </label>
                                <Field type="text" id="name" name="name"/>
                                <ErrorMessage name="name" component={TextError} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="serviceHour"> Service per hour </label>
                                <Field type="text" id="serviceHour" name="serviceHour"/>
                                <ErrorMessage name="serviceHour" component={TextError} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="travelCost"> Travel cost </label>
                                <Field type="text" id="travelCost" name="travelCost"/>
                                <ErrorMessage name="travelCost" component={TextError} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="otherCost"> Other cost </label>
                                <Field type="text" id="otherCost" name="otherCost"/>
                                <ErrorMessage name="otherCost" component={TextError} />
                            </div>
                            {/* conseguir note id */}
                            {/* <Link to={`/product-list/${id}`}>
                                <button type='button'>
                                    {" "}
                                    Show products list
                                </button>
                            </Link> */}
                            <button type="submit" disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Save</button>
                        </Form>
                    </Container>
                )
            }}
        </Formik>
    )


    // return (
    //     <div>
    //         <p>Start time</p>
    //         <p>End time</p>
    //         <p> Service per hour</p>
    //         <p> Travel Cost</p>
    //         <p> Other Cost</p>

    //         <p>Total value</p>
    //         <button> Show products list</button>
    //         <button>Close/Complete Service</button>
    //     </div>
    // )
}
