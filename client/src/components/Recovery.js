import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { userAuthStore }from '../store/store';


const Recovery = () => {
  


  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h3 className='text-3xl font-bold'>Recover </h3>
            <h3 className='text-3xl font-bold'>Password</h3>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Enter OTP to recover password
            </span>
          </div>

          <form className='py-20'>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Enter 6 digit OTP sent to your email address</span>
                </label>
                <input type="text" placeholder="OTP" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-success mt-10" type='submit'>Recover</button>
              </div>
            </div>
            <div className="text-center py-4">


              <span className='text-gray-500'>
                Can't get OTP 
                <Link className='text-red-500' to="/register"> Resend</Link>
              </span>


            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recovery;