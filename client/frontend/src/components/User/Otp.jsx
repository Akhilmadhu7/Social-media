import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput, { ResendOTP } from "otp-input-react";
import Axios from "axios";
import Countdown from 'react-countdown';
const baseUrl = "http://127.0.0.1:8000/accounts/";

function Otp({setOtpModal,email}) {
  console.log('here is the meila',email);
  const navigate = useNavigate();
  const [OTP, setOTP] = useState('');
  const [OtpError, setOtpError] = useState('')
  const [Resend, setResend] = useState(false)

  const onVerify = (e,OTP)=>{
    e.preventDefault()
    console.log('here is the otp',OTP);
    const data = { otp: OTP };
    try {
      Axios.post(baseUrl + "otp-verify", data)
        .then((res) => {
          console.log('response is ',res);
          setOtpModal(false)
          navigate("/");
        })
        .catch((err) => {
          console.log("then error", err);
          console.log('resp',err.response);
          console.log('data',err.response.data.Error);
          setOtpError(err.response.data.Error)
          if (OtpError) {
            
            console.log('here is the otp error',OtpError);
          }
        });
    } catch (error) {
      console.log("this is catch error", error);
    }
  }

  // setTimeout(() => {
  //   setResend(true)
  // }, '10000');

  // resend otp function
  // const resendOtp = ()=>{
  //   const data = {email:email}
  //   try {
  //     Axios.post(baseUrl+'resend-otp',data)
  //     .then((res)=>{
  //       setTimeout()
  //       setResend(false)
  //     })
  //     .catch((err)=>{
  //       console.log('catch err',err);
  //     })
  //   } catch (error) {
  //     console.log('try catch error',error);
  //   }

  // }

  

  return (
    <div>
      

            <div>
              <form action="" method="post">
                <div className=" absolute w-full h-full backdrop-blur-sm top-0 left-0 px-3 flex items-center">
                  <div className="container mx-auto">
                    <div className="max-w-sm mx-auto md:max-w-lg">
                      <div className="w-full">
                        <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-64 py-3 rounded text-center">
                          <h1 className="text-2xl font-bold">
                            OTP Verification
                          </h1>
                          <div className="flex flex-col mt-4">
                            <span>Enter the OTP you received at</span>
                            <span className="font-bold">
                              {/* {UserDetails.email} */}
                            </span>
                          </div>
                          {/* <div className=" flex justify-center pt-2">
                            {Resend ? (
                              <button
                                className="flex items-center text-purple-500 hover:text-white hover:bg-purple-500 cursor-pointer font-bold bg-white rounded-lg pl-2 pr-2 "
                                onClick={resendOtp}
                              >
                                Resend
                              </button>
                            ) : (
                              <Countdown date={Date.now() + 10000} />
                            )}
                            <Countdown date={Date.now() + 100000} /> 
                          </div> */}
                          <div
                            id="otp"
                            className="flex flex-row justify-center text-center px-2 mt-5"
                          >
                            
                            <OTPInput
                              value={OTP}
                              onChange={setOTP}
                              autoFocus
                              OTPLength={6}
                              otpType="number"
                              disabled={false}
                            />
                          </div>
                          <p className="text-red-500 font-[8px] mb-3 pl-3">
                            {OtpError}
                          </p>

                          <div className="flex justify-center text-center mt-5">
                            {/* <button className='flex items-center text-purple-500 hover:text-white hover:bg-purple-500 cursor-pointer font-bold bg-white rounded-lg pl-2 pr-2 ' >Resend</button> */}
                            <button
                              className="flex items-center text-green-500 hover:text-white hover:bg-green-500 cursor-pointer font-bold bg-white rounded-lg pl-2 pr-2 "
                              onClick={(e) => onVerify(e,OTP)}
                            >
                              Verify
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </form>
            </div>
    </div>
  );
}

export default Otp;
