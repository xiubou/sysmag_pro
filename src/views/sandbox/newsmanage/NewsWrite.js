import React, { useState, useEffect } from 'react'
import { Steps, Button, message, Space, Form, Input, Select, notification } from 'antd'
import axios from 'axios'
import NewsContent from '../../../components/newsmanage/NewsContent'
import './NewsManage.css'
const { Step } = Steps
const { Option } = Select

export default function NewsWrite(props) {

  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [content, setContent] = useState("")
  const [formInfo, setformInfo] = useState({})
  const [categoryList, setCategoryList] = useState([])


  useEffect(() => {
    axios.get("/categories").then(res => {
      // console.log("categories:",res.data)
      setCategoryList(res.data)
    })
  }, [])

  // 基本信息
  const getBaseContent = () => (
    <Form
      form={form}
      labelCol={{ sm: { span: 3 }, xs: { span: 12 } }}
      wrapperCol={{ sm: { span: 19 }, xs: { span: 6 } }}
    >
      <Form.Item
        name="title"
        label="新闻标题"
        rules={[
          {
            required: true,
            message: '请输入新闻的标题',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="新闻分类"
        rules={[
          {
            required: true,
            message: '请输入新闻分类',
          },
        ]}
      >
        <Select allowClear={true} >
          {
            categoryList.map(item => <Option key={"category" + item.id} value={item.id} >{item.title}</Option>)
          }
        </Select>
      </Form.Item>
    </Form>
  )

  //新闻内容
  const getNewsContent = () => (
    <NewsContent getContent={(value) => {
      //console.log(value)
      setContent(value)
    }}></NewsContent>
  )

  // 下一步
  const handleNext = () => {
    console.log("handleNext current:", current)
    if (current === 0) {
      form.validateFields().then(res => {
        // console.log("handleNext res", res)
        setformInfo(res)
        next()
      }).catch(err => {
        console.log("handleNext err", err)
      })
    } else {
      // console.log("handleNext content:", content)
      if (content === "" || content.trim() === "<p></p>") {
        message.error("新闻内容不能为空")
      } else {
        next()
      }
    }
  }

  // 保存草稿0,提交审核1
  const user = JSON.parse(localStorage.getItem("token"))
  const saveDraft = (auditState) => {
    axios.post('/news', {
      ...formInfo,
      "content": content,
      "region": user.region !== "" ? user.region : "全球",
      "author": user.username,
      "roleId": user.roleId,
      "auditState": auditState,
      "publishState": 0,
      "createTime": Date.now(),
      "star": 0,
      "view": 0,
    }).then(res => {
      notification.info({
        message: `通知`,
        description:
          `新闻撰写成功，您可以在此 [${auditState === 0 ? '草稿箱' : '审核列表'}] 中查看您的新闻`,
        placement: "bottomRight"
      })
      props.history.push(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')
    })
  }

  // 步骤
  const steps = [
    {
      key: 'basecontent',
      title: '基本信息',
      description: '新闻标题，新闻分类',
      content: getBaseContent()
    },
    {
      key: 'newscontent',
      title: '新闻内容',
      description: '新闻主体内容',
      content: getNewsContent(),
    },
    {
      key: 'newssub',
      title: '新闻提交',
      description: '保存草稿或者提交审核',
      content: 'Last-content',
    },
  ];


  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <h1 style={{ fontSize: '24px', marginBottom: "16px" }}><b>撰写新闻</b></h1>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.key} title={item.title} description={item.description} />
        ))}
      </Steps>

      <div className="steps-content" style={current === 2 ? { display: 'none' } : {}}>{steps[current].content}</div>

      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Space>
            <Button type="primary" onClick={() => saveDraft(0)}>
              保存草稿
            </Button>
            <Button type="danger" onClick={() => saveDraft(1)}>
              提交审核
            </Button>
          </Space>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </>
  );
}
