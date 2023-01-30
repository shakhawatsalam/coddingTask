import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar_2.jpeg';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidate } from '../helper/validate.js';
import convertToBase64 from '../helper/convert';

const Profile = () => {

  const [file, setFile] = useState();

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
      values = await Object.assign(values, { profile: file || '' });
      console.log(values)
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
            <h3 className='text-5xl font-bold'>Profile</h3>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Your Profile Select the Options
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
            <div className="textbox flex flex-col items-center gap-6">

              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} `} type="text" placeholder='FirstName' />
                <input {...formik.getFieldProps('lastName')} className={`${styles.textbox}`} type="text" placeholder='LastName' />
              </div>
              {/* <div className="name flex w-3/4 gap-10">
                <div className="form-control w-full max-w-xs">
                  <input {...formik.getFieldProps('email')} type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                  <input {...formik.getFieldProps('email')} type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" />
                </div>
              </div> */}


              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} `} type="text" placeholder='Mobile No.' />
                <input {...formik.getFieldProps('email')} className={`${styles.textbox}`} type="text" placeholder='Email*' />
              </div>

              <select className={`${styles.textbox}`}>
                <option disabled selected>Sectors</option>
                <option selected>Construction materials</option>
                <option>ELectionics and Optics</option>
              </select>

              {/* divide  */}
              <button className="btn btn-success" type='submit'>Save</button>


            </div>
            {/* hello  */}


            <div className="text-center py-4">


              <span className='text-gray-500'>
                come back leater!!
                <Link className='text-red-500' to="/">Log Out</Link>
              </span>


            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;