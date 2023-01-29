import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar_2.jpeg';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate, passwordValidate } from '../helper/validate.js'

const Username = () => {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: usernameValidate,
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      // console.log(values)
    }
  });
  console.log(formik);
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h3 className='text-5xl font-bold'>Hello Again</h3>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Explore More by connection with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div class="avatar flex justify-center mb-5">
              <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={avatar} />
              </div>
            </div>
            {/* <div className='profile flex justify-center py-4'>
             
              <img  src={avatar} className={styles.profile_img} alt="avater" />
            </div> */}
            {/* hello  */}
            <div className="textbox flex flex-col items-center gap-6">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">What is your name?</span>
                </label>
                <input {...formik.getFieldProps('username')} type="text" placeholder="User Name" className="input input-bordered w-full max-w-xs" />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input {...formik.getFieldProps('password')} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
              </div>
              <button className="btn btn-success" type='submit'>Log in</button>

              {/* <input type="text" placeholder='Username' />
              <button className={styles.btn} type='submit'>Let's Go</button> */}
            </div>
            {/* hello  */}
            <div className="text-center py-4">
              {!formik.errors ?
                <span className='text-gray-500'>Still Not Register!! <Link className='text-red-500' to="/register">Recover</Link></span>

                :
                <span className='text-gray-500'>Still Not Register!! <Link className='text-red-500' to="/register">Register</Link></span>

              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Username;