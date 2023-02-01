import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar_2.jpeg';
import styles from '../styles/Username.module.css';
import toast,{ Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidate } from '../helper/validate.js';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';

const Register = () => {

  const [file, setFile] = useState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    validate: registerValidate,

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values);
      values = await Object.assign(values, { profile: file || '' });
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating.....!",
        success: <b>Register Successfully</b>,
        error: <b>Could Not Register</b>
      });

      registerPromise.then(function () { navigate('/') });
    }
  });
  // formik dosent't supprot file upload so we need to create this handaler
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
    console.log(base64)
  }
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: "60%", height: "85vh" }}>

          <div className="title flex flex-col items-center">
            <h3 className='text-5xl font-bold'>Register</h3>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Thanks for register
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='flex justify-center'>
              <label htmlFor="profile">
                <div class="avatar mb-5">
                  <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={file || avatar} />
                  </div>
                </div>
              </label>

              <input onChange={onUpload} type="file" name="profile" id="profile" />

            </div>
            {/* <div className='profile flex justify-center py-4'>
             
              <img  src={avatar} className={styles.profile_img} alt="avater" />
            </div> */}
            {/* hello  */}
            <div className="textbox flex flex-col items-center gap-6">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input {...formik.getFieldProps('email')} type="text" placeholder="Email*" className="input input-bordered w-full max-w-xs" />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">What is your name?</span>
                </label>
                <input {...formik.getFieldProps('username')} type="text" placeholder="User Name*" className="input input-bordered w-full max-w-xs" />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input {...formik.getFieldProps('password')} type="password" placeholder="Password*" className="input input-bordered w-full max-w-xs" />
              </div>
              <button className="btn btn-success" type='submit'>Register</button>

              {/* <input type="text" placeholder='Username' />
              <button className={styles.btn} type='submit'>Let's Go</button> */}
            </div>
            {/* hello  */}
            <div className="text-center py-4">


              <span className='text-gray-500'>
                Already Register!!
                <Link className='text-red-500' to="/">Log in</Link>
              </span>


            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;