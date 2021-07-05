import * as yup from "yup";

export const validationLogin = yup.object({
    email: yup.string().email("It must to be an email").required("Email is required"),
    password: yup.string().min(6, "Minimum is 6 characters").required("Password is required")
});

export const validationForgotPass = yup.object({
    email: yup.string().email("It must to be an email").required("Email is required"),
});

export const validationProfile = yup.object({
    email:  yup.string().email('It must to be an email').required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
});

export const validationEmailProfile = yup.object({
    email:  yup.string().email('It must to be an email').required('Email is required'),
})

export function validationService (startTime) {
    const regexNumbers = /^[0-9]*$/;
    const validationSchema = yup.object({
        endTime: yup
            .date("Invalid date")
            .min(
                startTime,
                "It must be greater than the start time"
            )
            .required("End time is required"),
        name: yup.string().required("Name is required"),
        serviceHour: yup
            .number()
            .positive("It must be positive number")
            .min(0.1, "Minimum 0.1")
            .required("Service hour is required"),
        travelCost: yup.string().matches(regexNumbers, "It must be a number").required("Minimum is 0"),
        otherCost: yup.string().matches(regexNumbers, "It must be a number").required("Minimum is 0"),
    });

    return validationSchema;
}

export const validationProduct = yup.object({
    name: yup
        .string()
        .min(3, "Minimum is 3 characters")
        .max(50, "Maximum is 50 characters")
        .required("Name is required"),
    description: yup.string().nullable(),
    price: yup
        .number()
        .positive("It must be positive number")
        .min(0.1, "Minimum 0.1")
        .required("Price is required"),
    quantity: yup
        .number()
        .min(1, "Minimum 1")
        .integer("Quantity is an integer number")
        .required("Quantity is required"),
});


