import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Modal, Tree } from 'antd';
import { UnorderedListOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import _ from 'lodash'

const { confirm } = Modal

export default function RoleList() {

  const [dataSource, setDataSource] = useState([])
  const [currentRights, setcurrentRights] = useState([])
  const [thisRightList, setThisRightList] = useState([])
  const [currentId, setCurrentId] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {roleId} = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    axios("/roles").then(res => {
      // console.log("rolesList:",res.data)
      setDataSource(res.data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    axios("/rights?_embed=children").then(res => {
      // console.log("rolesList:",res.data)
      setThisRightList(res.data)
    })
  }, [])

  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除不?',
      icon: <ExclamationCircleOutlined />,
      okText: "嗯!",
      cancelText: "再想想",
      onOk() {
        delRole(item)
      },
      onCancel() {
      },
    });

  }
  // 删除角色
  const delRole = (item) => {
    // 使用json-server前后端都要删除数据，保证刷新后数据不变
    // console.log("delRole:", item)
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`/roles/${item.id}`)
  }

  // 是否有删除权限
  const checkRole = (item, right)=>{
    // console.log(item.rights)
    if(_.indexOf(item.rights,right) < 0) return true
    else {
      if (roleId!==1 && item.id === 1) return true  // 下级不可操作上级
      if (roleId===3 && item.id !== 3) return true 
    }
    
    // return _.indexOf(item.rights,right) < 0 ? true: false
  }
  const roleColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '操作',
      key: 'action',
      render: (item) => {
        return (
          <Space size="middle">
            <Button danger shape="circle" disabled={checkRole(item,"/right-manage/role/delete")} icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
            <Button type="primary" shape="circle" icon={<UnorderedListOutlined />}
              onClick={() => {
                setIsModalVisible(true)
                setcurrentRights(item.rights)
                setCurrentId(item.id)
              }}
              disabled={checkRole(item,"/right-manage/role/update")}
            />
          </Space>
        )
      }
    }
  ]

  const handleOk = () => {
    // console.log("currentRights", currentRights)
    // console.log("currentId", currentId)
    setIsModalVisible(false)
    //同步datasource
    setDataSource(dataSource.map(item => {
      if (item.id === currentId) {
        return {
          ...item,
          rights: currentRights  //替换当前选中权限
        }
      }
      return item
    }))
    //修改后端数据
    axios.patch(`/roles/${currentId}`, {
      rights: currentRights
    })
  }

  const handleCancel = () => {
    // console.log("handleCancel")
    setIsModalVisible(false);
  };

  const onCheck = (checkKeys) => {
    // console.log("onCheck checkKeys",checkKeys)  // checkKeys是当前选中的所有kyes
    setcurrentRights(checkKeys.checked)
  }

  return (
    <>
      <Table rowKey={item => "role" + item.id} size="small" loading={loading} dataSource={dataSource} columns={roleColumns}
        pagination={{
          pageSize: 5
        }}
      />
      <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Tree
          checkable
          checkedKeys={currentRights}
          onCheck={onCheck}
          checkStrictly={true}
          treeData={thisRightList}
        />
      </Modal>
    </>
  )
}
