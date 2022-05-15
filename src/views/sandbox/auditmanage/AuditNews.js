import React,{useState,useEffect} from 'react'
import {Table, Button, notification, Space, Tooltip} from 'antd'
import axios from 'axios'

export default function AuditNews() {
  const [dataSource, setDataSource] = useState([])
  const {roleId,region,username}  = JSON.parse(localStorage.getItem("token"))

  useEffect (()=>{
    let roles = {
      "1":"superadmin",
      "2":"admin",
      "3":"editor"
    }
    axios.get(`/news?auditState=1&_expand=category`).then( res => {
      let list = res.data
      const result = roles[roleId] === "superadmin" ? list :
      [
        ...list.filter(item => item.author === username),
        ...list.filter(item =>item.region===region && roles[item.roleId]==="editor"),

      ]
      setDataSource(result)
    })
  },[roleId,region,username])

  const columns = [
    {
        title: '新闻标题',
        dataIndex: 'title',
        render: (title,item) => {
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
        title: "新闻分类",
        dataIndex: 'category',
        render: (category) => {
            return <div>{category.title}</div>
        }
    },
    {
        title: "操作",
        render: (item) => {
            return <Space>
               <Button type="primary" onClick={()=>handleAudit(item,2,1)}>通过</Button>
               <Button danger onClick={()=>handleAudit(item,3,0)}>驳回</Button>
            </Space>
        }
    }
];

// 审核
const handleAudit =(item,auditState,publishState)=>{
  setDataSource(dataSource.filter(data=>data.id!==item.id))

  // 修改后台数据状态
  axios.patch(`/news/${item.id}`,{
      auditState,
      publishState
  }).then(res=>{
      notification.info({
          message: `通知`,
          description:
            `已审核，您可以到【审核管理】- <审核列表>]中查看新闻的审核状态`,
          placement:"bottomRight"
      });
  })
}

  return (
    <Table dataSource={dataSource} columns={columns}
            pagination={{
                pageSize: 5
            }} 
            rowKey={item=> 'auditnews'+item.id}
            />
  )
}
