import React, { useEffect } from 'react';
import {  Navigate, useNavigate } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate.js'
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import useFetch from '../hooks/fetch.hook.js'

const Reset = () => {
  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{isLoading, apiData, status, serverError}] = useFetch('createResetSession');


  useEffect(() => {
    console.log(apiData);
  })


  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      let resetPromise = resetPassword({ username, password: values.password });
      toast.promise(resetPromise, {
        loading: 'Reseting Password....',
        success: <b>Password Reset Successfully</b>,
        error: <b>Could not Reset Password</b>
      });

      resetPromise.then(() => navigate('/password'));
    }
  });

  if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if (status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>;
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