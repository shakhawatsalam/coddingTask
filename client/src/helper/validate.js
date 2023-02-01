import toast from "react-hot-toast"
import { authencate } from "./helper.js";
// validate login page username
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    if (values.username) {
        //check user exist or not
        const { status } = await authencate(values.username);

        if (status !== 200) {
            errors.exist = toast.error("Chose a unique userName");
        }
    }

    return errors;
};

// validate password
export async function passwordValidate(values) {
    const errors = passWordVerify({}, values);

    return errors;
};
// validate reset password
export async function resetPasswordValidation(values) {
    const error = passWordVerify({}, values);

    if (values.password !== values.confirmPassword) {
        error.exist = toast.error("Password Not matched...!");
    };
    return error;
};

// validate register from 
export async function registerValidate(values) {
    const errors = usernameVerify({}, values);
    passWordVerify(errors, values);
    emailVerify(errors, values);

    return errors;

}
// validate profile page 
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}
// validate userName

function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!');
    } else if (values.username.includes(" ")  || values.password.includes(" ")) {
        error.username = toast.error('Invalid Username...');
    }
    return error;
};


// validate password //
function passWordVerify(errors = {}, values) {

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        errors.password = toast.error("Password Required...!");
    } else if (values.password.includes(" ")) {
        errors.password = toast.error("wrong Password...");
    } else if (values.password.length < 4) {
        errors.password = toast.error("Password must be more then 4 charecters long");
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error("password must have special characters");
    };
    return errors;
};

//validate email 
function emailVerify(errors = {}, values) {
    if (!values.email) {
        errors.email = toast.error("Email Required");
    } else if (values.email.includes(" ")) {
        errors.email = toast.error("Wrong Email...!")

    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = toast.error("Invalid email address...!")
    }
}


