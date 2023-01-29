import toast from "react-hot-toast"

// validate login page username
export async function usernameValidate(values) {
    console.log(values)
    const errors = usernameVerify({}, values);
    console.log(errors);
    return errors;
}
// validate password //
function passWordVerify(errors = {}, values) {

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        errors.password = toast.error("Password Required...!");
    } else if (values.password.includes("")) {
        errors.password = toast.error("wrong Password...");
    } else if (values.password.length < 4) {
        errors.password = toast.error("Password must be more then 4 charecters long");
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error("password must have special characters");
    };
    return errors;
}
// validate userName

function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!');
    } else if(values.username.includes(" ") || values.password.includes(" ")) {
        error.username = toast.error('Invalid Username...');
    }
    return error;
}