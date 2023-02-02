import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { genarateOTP, verifyOTP } from '../helper/helper';


const Recovery = () => {

  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    genarateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) return toast.success('OTP has been send to your Email');
      return toast.error('Problem while generating OTP');
    })
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success('Verify Successfully');
        return navigate('/reset');
      };
    } catch (error) {
      return toast.error('Wrong OTP! Check email again!!')
    }




  };

  // handle of resend OTP
  function resendOTP() {
    let sendPromise = genarateOTP(username);

    toast.promise(sendPromise, {
      loading: 'Sending...',
      success: <b>OTP has been send to your email</b>,
      error: <b>Could not send it!</b>
    });

    sendPromise.then(OTP => {
      console.log(OTP);
    })
  }



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

          <form className='py-20' onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Enter 6 digit OTP sent to your email address</span>
                </label>
                <input onChange={(e) => setOTP(e.target.value)} type="text" placeholder="OTP" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-success mt-10" type='submit'>Recover</button>
              </div>
            </div>
            <div className="text-center py-4">





            </div>
          </form>
          <div className="text-center py-4">
            <span className='text-gray-500' onClick={resendOTP}>Can't get OTP? <button className='text-red-500'>Resend</button></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recovery;