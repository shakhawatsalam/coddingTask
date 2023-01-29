import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar_2.jpeg';
import styles from '../styles/Username.module.css';

const Username = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h3 className='text-5xl font-bold'>Hello Again</h3>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Explore More by connection with us.
            </span>
          </div>

          <form className='py-1'>
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
                <input type="text" placeholder="User Name" className="input input-bordered w-full max-w-xs" />
              </div>
              <button className="btn btn-success">Log in</button>

              {/* <input type="text" placeholder='Username' />
              <button className={styles.btn} type='submit'>Let's Go</button> */}
            </div>
            {/* hello  */}
            <div className="text-center py-4">
              <span className='text-gray-500'>Still Not Register!! <Link className='text-red-500' to="/register">Register</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Username;