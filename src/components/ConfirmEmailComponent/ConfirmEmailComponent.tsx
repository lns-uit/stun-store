import React, { useState, useEffect } from 'react';
import '../../layout/SignInLayout/styles.css';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/index';


function ConfirmEmailComponent() {
  const [loginErr, setLoginErr] = useState(false);
  const [strLoginErr, setStrLoginErr] = useState('');
  const [second,setSecond] = useState(20);
  const dispatch = useDispatch();
  const email = useSelector(
    (state: RootState) => state.email
  )
  const onFinish = async (values: any) => {
    
  };

  const countDownTime = () => {
    var timer = setTimeout(function(){
      setSecond(second-1);
      console.log(1);
      if (second === 0 ){
        clearTimeout(timer)
      }
    },1000)
  }

  useEffect(() => {
    second === 0 ? null : countDownTime()
  },[second])
  return (
    <div className='bgr-brow2 b-radius-5'>
      <div className='pd-sign-in'>
        <div className='confirm-email-content'>
          <div>
            <div className='confirm-email-title'>Confirm Email</div>
            <div
              id='error_display'
              className='checkout_error'
              style={{ display: loginErr === true ? 'block' : 'none' }}>
              {strLoginErr}
            </div>
          </div>
          <Form
            name='confirm-email'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 50 }}
            onFinish={onFinish}
            layout="vertical"
          >
            <div className="note">
              <p className="m-bottom-10 fs-12 fw-normal">Verification code sent to your email {email} please check and confirm</p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <Form.Item
                name='code'
                label="Code"
                rules={[
                  { required: true, message: 'Please input your code!' },
                ]}>
                <Input className = "b-radius-5" placeholder='Code' />
              </Form.Item>
            </div>
            <div className="send-again">
                <div 
                  className={second === 0 ? "white center pointer" : "gray-4 center"}
                  onClick={()=>{second === 0 ? setSecond(20): null}}
                >
                  <p className="m-0 fs-12 fw-normal">Click to resend code ({second})</p>
                </div>
            </div>
            <Form.Item
              wrapperCol={{ offset: 0, span: 100 }}
              className='button-m-top-60'>
              <Button
                style={{ height: '40px' }}
                type='primary'
                htmlType='submit'
                className='full-width btn-login-submit'>
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmailComponent;
