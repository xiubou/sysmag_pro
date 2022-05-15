import React, { useState, useEffect } from 'react'
import { Button, Table, Modal,notification, Space, Tooltip} from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined,UploadOutlined } from '@ant-design/icons'
const { confirm } = Modal

export default function NewsDraft(props) {

  const [dataSource, setdataSource] = useState([])
//   const [categorys, setCategorys] = useState([])
  const {username}  = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
      axios.get(`/news?author=${username}&auditState=0&_expand=category`).then(res => {
          // console.log("newsDraft res data:",res.data)
          setdataSource(res.data )
      })
    //   axios.get(`/categorys`).then(res => {
    //     // console.log("categorys res data:",res.data)
    //     setCategorys(res.data )
    //   })
  }, [username])

  const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: (id) => {
            return <b>{id}</b>
        }
    },
    {
        title: '新闻标题',
        dataIndex: 'title',
        render:(title,item)=>{
            return (<Tooltip title="点击查看详情">
                    <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
                    </Tooltip>)
        }
    },
    {
        title: '作者',
        dataIndex: 'author'
    },
    {
        title: '分类',
        dataIndex: 'category',
        render:(category)=>{
            // let data = [...categorys]
            // let result = data.filter(item => item.id === categoryId)
            // console.log("result:",result)
            return category!==undefined ?  category.title : ""
        }
    },
    {
        title: "操作",
        render: (item) => {
            return <Space>
                <Tooltip title="删除">
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmDelete(item)} />
                </Tooltip>
                <Tooltip title="重新编辑">
                    <Button shape="circle" icon={<EditOutlined />} onClick={()=>{
                    props.history.push(`/news-manage/update/${item.id}`)
                }}/>
                </Tooltip>
                <Tooltip title="提交审核">
                    <Button type="primary" shape="circle" icon={<UploadOutlined />} onClick={()=>handleCheck(item.id)}/>
                </Tooltip>
            </Space>
        }
    }
];

const handleCheck = (id)=>{
  axios.patch(`/news/${id}`,{
      auditState:1
  }).then(res=>{
      props.history.push('/audit-manage/list')

      notification.info({
          message: `通知`,
          description:
            `您可以到${'审核列表'}中查看您的新闻`,
          placement:"bottomRight"
      });
  })
}

const confirmDelete = (item) => {
  confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      okText:"确定",
      cancelText:"取消",
      onOk() {
          handleDelete(item)
      },
      onCancel() {
      },
  });

}
//删除
const handleDelete = (item) => {
  // console.log(item)

  setdataSource(dataSource.filter(data => data.id !== item.id))
  axios.delete(`/news/${item.id}`)
}

  return (
     <Table dataSource={dataSource} columns={columns} size="small"
            pagination={{
                pageSize: 5
            }} 
            rowKey={item=>"newsDraft"+item.id}
      />
  )
}
