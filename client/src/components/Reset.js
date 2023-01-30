import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar_2.jpeg';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate.js'

const Reset = () => {

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    }
  });
  console.log(formik);
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: "50%" }}>

          <div className="title flex flex-col items-center">
            <h3 className='text-5xl font-bold'>Reset Password</h3>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Enter ner password
            </span>
          </div>

          <form className='py-20' onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input {...formik.getFieldProps('password')} type="text" placeholder="password" className="input input-bordered w-full max-w-xs" />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input {...formik.getFieldProps('confirmPassword')} type="password" placeholder="Confirm Password" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-success mt-10" type='submit'>Reset</button>
              </div>

              {/* <input type="text" placeholder='Username' />
              <button className={styles.btn} type='submit'>Let's Go</button> */}
            </div>
            {/* hello  */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;