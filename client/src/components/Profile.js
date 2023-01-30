import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar_2.jpeg';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate.js';
import convertToBase64 from '../helper/convert';

const Profile = () => {
  const [file, setFile] = useState();
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    setCheck((prev) => !prev);
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      select: '',
      check: ''
    },
    validate: profileValidation,

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
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '3rem' }}>

          <div className="title flex flex-col items-center">
            <h3 className='text-5xl font-bold'>Profile</h3>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Your Profile Select the Options
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor="profile">
                <div className={styles.hello}>
                  <img src={file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                </div>
              </label>

              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>
            <div className="textbox flex flex-col items-center gap-6">

              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' />
                <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='LastName' />
              </div>


              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Email*' />
              </div>

              <select {...formik.getFieldProps('select')} className={`${styles.textbox} ${extend.textbox}`} >
                <option disabled selected>Sectors</option>
                <option selected>Construction materials</option>
                <option>ELectionics and Optics</option>
              </select>

              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-xl">Agree to terms</span>
                  <input {...formik.getFieldProps('check')} type="checkbox" onClick={handleCheck} className="checkbox checkbox-accent ml-5" />
                </label>
              </div>

              {/* divide  */}
              {check
                ?
                <button className="btn btn-accent" type='submit' >Save</button>
                :
                <button className="btn btn-accent" disabled type='submit' >Save</button>
              }


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