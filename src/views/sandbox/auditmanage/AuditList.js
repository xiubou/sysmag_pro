import React, { useState, useEffect } from 'react'
import { Table, Tooltip, Tag, notification, Button } from 'antd'
import axios from 'axios'

export default function AuditList(props) {

  const [dataSource, setDataSource] = useState([])
  const colorList = ["", 'orange', 'green', 'red']
  const auditStates = ["草稿箱", "审核中", "已通过", "未通过"]

  const { username } = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    // auditState_ne=0，审核状态不在草稿箱
    axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
      console.log("AuditList res data:", res.data)
      setDataSource(res.data)
    })
  }, [username])

  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title, item) => {
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
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => {
        // let data = [...categorys]
        // let result = data.filter(item => item.id === categoryId)
        // console.log("result:",result)
        return category !== undefined ? category.title : ""
      }
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render: (auditState) => {
        return <Tag color={colorList[auditState]}>{auditStates[auditState]}</Tag>
      }
    },
    {
      title: "操作",
      render: (item) => {
        switch (item.auditState) {
          case 1:
            return <Button type="primary" onClick={() => handleRervert(item)} >撤销</Button>
          case 2:
            return <Button type="primary" onClick={() => handlePublish(item)} >发布</Button>
          case 3:
            return <Button type="primary" onClick={() => handleUpdate(item)} >修改</Button>
          default:
            return null
        }
      }
    }
  ]
  // 撤销
  const handleRervert = (item) => {
    // 删除审核列表中目标内容
    setDataSource(dataSource.filter(data => data.id !== item.id))

    // 后台更新该条数据审核状态重新进入草稿箱
    axios.patch(`/news/${item.id}`, {
      auditState: 0
    }).then(res => {
      notification.info({
        message: `通知`,
        description:
          `已撤销回草稿箱中，您可以到草稿箱中查看新闻`,
        placement: "bottomRight"
      });

    })
  }
  // 发布：发布状态为 2
  // 0-未发布 1-待发布 2-已发布 3-已下线
  const handlePublish = (item) => {
    axios.patch(`/news/${item.id}`, {
      "publishState": 2,
      "publishTime": Date.now()
    }).then(res => {
      notification.info({
        message: `通知`,
        description:
          `发布成功，您可以到【发布管理】- <已发布> 中查看您的新闻`,
        placement: "bottomRight"
      });
      // 跳转至 “已发布” 界面
      props.history.push('/publish-manage/published')
    })
  }
  // 修改
  const handleUpdate = (item) => {
    props.history.push(`/news-manage/update/${item.id}`)
  }
  return (
    <Table dataSource={dataSource} columns={columns}
      pagination={{
        pageSize: 5
      }}
      rowKey={item => "auditlist" + item.id}
    />
  )
}
