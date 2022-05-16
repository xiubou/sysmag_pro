import React, { useEffect, useState } from 'react'
// import { rightTableData } from '../../../static/staticData';
import { Table, Tag, Space, Button, Modal, Popover, Switch } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
const {confirm} = Modal
export default function UserList() {

  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("/rights?_embed=children").then(res => {
      // console.log("rightList:", res.data)
      res.data.forEach(item => {
        if (item.children.length === 0) {
          item.children = ""
        }
      })
      setDataSource(res.data)
      setLoading(false)
    })
  }, [])

  const rightColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '权限路径',
      key: 'key',
      dataIndex: 'key',
      render: url => (
        <Tag color={"orange"} key={url}>
          {url}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (text) => {
        return (
          <Space size="middle">
            <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(text)} />
            <Popover content={
                <span>权限开关: <Switch style={{float:'right'}} checked={text.pagepermisson} onChange={() => onChangeSwitch(text)} /></span>
            } title="编辑权限" trigger={typeof(text.pagepermisson) === "undefined" ? "" : "click"}>
              <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={typeof(text.pagepermisson) === "undefined"}/>
            </Popover>
          </Space>
        )
      }
    }
  ];
  // 编辑权限开关
  const onChangeSwitch = (item) => {
    // console.log("switch to",item);
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setDataSource([...dataSource])

    //修改后台传入数据
    if(item.grade === 1){
      axios.patch(`/rights/${item.id}`,{
          pagepermisson:item.pagepermisson
      })
    }else{
      axios.patch(`/children/${item.id}`,{
          pagepermisson:item.pagepermisson
      })
    }
  }

  // 删除权限
  const delRight = (item) => {
    // 使用json-server前后端都要删除数据，保证刷新后数据不变
    console.log("delRight:", item)
      if (item.grade === 1) {  // 一级菜单删除rights中的数据
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/rights/${item.id}`)  // 删除后端数据
    }else{  // 二级菜单删除children中的数据
        let list = dataSource.filter( data => data.id === item.rightId)
        console.log("delRight list:", list)
        list[0].children = list[0].children.filter(data=>data.id!==item.id)
        setDataSource([...dataSource])
        axios.delete(`/children/${item.id}`)
    }
  }

  const confirmMethod = (item) => {
      confirm({
          title: '你确定要删除不?',
          icon: <ExclamationCircleOutlined />,
          okText: "嗯!",
          cancelText: "再想想",
          onOk() {
              delRight(item)
          },
          onCancel() {
          },
      });

  }

  return (
    <div>
      <Table rowKey = {item => "right"+ item.id} 
        size="small" 
        loading = {loading} 
        dataSource={dataSource} 
        columns={rightColumns}
        pagination={{
          pageSize: 5
        }}
      />
    </div>
  )
}
