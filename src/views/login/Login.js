import React from 'react'
import axios from 'axios'
import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Particles from 'react-tsparticles';  // 粒子特效
import { particleParams } from '../../static/staticData';
//css
import './Login.css'
import { loadFull } from 'tsparticles';

export default function Login(props) {

  const confirmLogin = (values) => {
    // console.log("confirmLogin values",values)

    axios.get(`/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
      // console.log("confirmLogin resdata",res.data)
      if (res.data.length === 0) {
        message.error("用户名不存在或密码错误！")
      } else {
        // console.log("Json resdata",JSON.stringify(res.data[0]))
        localStorage.setItem("token", JSON.stringify(res.data[0]))
        props.history.push("/")
      }
    })
  }

  const particlesInit = async(main) => {
    await loadFull(main)
  }

  const particlesLoaded = (container) => {
    // console.log("particles:",container)
  }
  return (
    <div style={{ background: '#1a273e', height: "100%", overflow: 'hidden' }}>
      <Particles height={document.documentElement.clientHeight} 
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleParams}
      />
      <div className="formContainer">
        <div className="logintitle">Xiubou新闻发布管理系统</div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={confirmLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入登录密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
