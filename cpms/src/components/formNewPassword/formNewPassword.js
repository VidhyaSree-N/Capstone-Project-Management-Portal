import React, { useState } from 'react';
import camsBlue from '../../assets/camsBlue.png';
import './formNewPasswordStyles.css'

const FormNewPassword = () => {

    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordHasValue, setPasswordHasValue] = useState(false);

    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== '');
    };
  return (
    <div className='formNewPassword'>
        <div className='formNewPassword-container'>
            <form className='formNewPassword-actualForm'>
                        <div className='formNewPassword-Logo-Help'>
                            
                                {/* logo goes here */}
                                <div className='formNewPassword-logo'>
                                    <div class="formNewPassword-camsBlue"> <img src={camsBlue} alt="CAMS Logo" />  </div>
                                </div>

                                {/* Help icon goes here */}
                                <div className='formNewPassword-help'>
                                    <div className='formNewPassword-question'> 
                                        <svg className='qSvg' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 29 29">
                                            <path id="ic_help_outline_24px" d="M15.05,25.2h2.9V22.3h-2.9ZM16.5,2A14.5,14.5,0,1,0,31,16.5,14.505,14.505,0,0,0,16.5,2Zm0,26.1A11.6,11.6,0,1,1,28.1,16.5,11.615,11.615,0,0,1,16.5,28.1Zm0-20.3a5.8,5.8,0,0,0-5.8,5.8h2.9a2.9,2.9,0,1,1,5.8,0c0,2.9-4.35,2.538-4.35,7.25h2.9c0-3.263,4.35-3.625,4.35-7.25A5.8,5.8,0,0,0,16.5,7.8Z" transform="translate(-2 -2)" fill="#fff"/>
                                        </svg>
                                    </div>
                                </div>

                        </div>

                        <div className='create-new-password'> 
                                <span class='create-new-password-01'>Create</span>
                                <span   class='create-new-password-02'>new password</span>
                        </div>

      
                <div className='formNewPassword-input-fields'>
                        <div className='formNewPassword-newPassword'>

                                <label htmlFor="password" className={`formNewPassword-newPassword-label ${isFocused || hasValue ? 'focused' : ''}`}>
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    className={`formNewPassword-newPassword-input ${isFocused || hasValue ? 'focused' : ''}`}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                        </div>

                        <div className='formNewPassword-confirmPassword'>
                                <input
                                    type="password"
                                    id="password"
                                    className="formNewPassword-confirmPassword-input"
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={(e) => {
                                        setPasswordFocused(false);
                                        setPasswordHasValue(e.target.value !== '');
                                    }}
                                />

                                <label htmlFor="password" className={`formNewPassword-confirmPassword-label ${passwordFocused  || passwordHasValue ? 'focused' : ''}`}> Confirm Password</label>
                        </div>

                </div>

                <div className='formNewPassword-buttons'>
                        <button className='formNewPassword-continue'>Reset Password</button>
                </div>                        
                
            </form>
        </div>

    </div>
  )
}

export default FormNewPassword