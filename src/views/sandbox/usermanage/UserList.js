import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table, Switch, Space, Button, Modal, Form } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import UserForm from '../../../components/usermanage/UserForm';

const { confirm } = Modal

export default function UserList() {

  const [dataSource, setDataSource] = useState([])  // 表格数据
  const [loading, setLoading] = useState(true)  // 表格loading状态
  const [roleList, setroleList] = useState([])  // 角色列表
  const [regionList, setregionList] = useState([])  //区域列表
  const [addVisible, setaddVisible] = useState(false)  //添加用户modal是否弹出
  const [updateVisible, setupdateVisible] = useState(false)  // 编辑用户modal是否弹出
  const [addform] = Form.useForm();
  const [updateform] = Form.useForm();
  const [currentRecord, setcurrentRecord] = useState(null)
  const [regionDisabled, setregionDisabled] = useState(false) //

  const userColumns = [
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
      filters: [
        ...regionList.map(item=>({
            text:item.title,
            value:item.value
        })),
        {
            text:"全球",
            value:"全球"
        }    

    ],

    onFilter:(value,item)=>{
        if(value==="全球"){
            return item.region===""
        }
        return item.region===value
    }, 
      render: region => <b>{region === "" ? "全球" : region}</b>
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      key: 'role',
      render: (text) => text.roleName
    },
    {
      title: '用户名',
      key: 'username',
      dataIndex: 'username',
    }, {
      title: '用户状态',
      key: 'roleState',
      dataIndex: 'roleState',
      render: (text, record) => (
        <Switch checked={text} disabled={record.default} onChange={() => changeUserState(record)} />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(text)}
              disabled={record.default} />
            <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={record.default}
              onClick={() => clickUpdate(record)} />
          </Space>
        )
      }
    }
  ];

  // 处理点击编辑事件
  const clickUpdate = (record) => {
    setTimeout(() => {
      setupdateVisible(true)
      if (record.roleId === 1) {
        //超级管理员禁止选择区域，默认全球空字符
        setregionDisabled(true)
      } else {
        //其他角色区域可选
        setregionDisabled(false)
      }
      updateform.setFieldsValue(record)  // 表单弹出初始值
    }, 0)
    setcurrentRecord(record)  // 当前编辑行数据
  }

  const {roleId,username,region} = JSON.parse(localStorage.getItem("token"))
  // 用户列表数据
  useEffect(() => {
    let roles = {
        "1":"superadmin",
        "2":"admin",
        "3":"editor"
    }
    axios.get("/users?_expand=role").then(res => {
      // console.log("usersList:", res.data)
      setDataSource(
        roles[roleId]==="superadmin" ?
          res.data:
          [
            ...res.data.filter(
              item=> item.username===username && 
                     item.region===region && roles[item.roleId]==="editor"
            )
          ]
      )
      setDataSource(res.data)
      setLoading(false)
    })
  }, [roleId,username,region])

  // 区域数据
  useEffect(() => {
    axios.get("/regions").then(res => {
      // console.log("regions:", res.data)
      setregionList(res.data)
    })
  }, [])

  // 角色数据
  useEffect(() => {
    axios.get("/roles").then(res => {
      // console.log("roles:", res.data)
      setroleList(res.data)
    })
  }, [])

  // 切换用户状态
  const changeUserState = (record) => {
    // console.log("changeUserState record",record)
    record.roleState = !record.roleState
    setDataSource([...dataSource])

    //同步后端
    axios.patch(`/users/${record.id}`,{
        roleState:record.roleState
    })
  }

  // 确认删除
  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除不?',
      icon: <ExclamationCircleOutlined />,
      okText: "嗯!",
      cancelText: "再想想",
      onOk() {
        setDataSource(dataSource.filter(data=>data.id!==item.id))

        axios.delete(`/users/${item.id}`)
      },
      onCancel() {
      },
    });

  }
  // 添加用户
  const addOnOk = () => {
    addform.validateFields().then(value => {
      // console.log("addFormOK then value:", value)
      setaddVisible(false)
      addform.resetFields()
      //post到后端，生成id，更新datasource
      axios.post(`/users`, {
          ...value,
          "roleState": true,
          "default": false,
      }).then(res=>{
          // console.log(res.data)
          setDataSource(
            [...dataSource,
              {
                ...res.data,
                role:roleList.filter(item=>item.id===value.roleId)[0]
              }
            ]
          )
      })
    }).catch(err => {
      console.log("addFormOK err", err)
    })
  }
  // 编辑更新用户
  const updateOnOk = () => {
    updateform.validateFields().then(value => {
      // console.log("updateOnOk then value:", value)
      setupdateVisible(false)

      setDataSource(dataSource.map(item => {
        if (item.id === currentRecord.id) {
          return {
            ...item,
            ...value,
            role: roleList.filter(data => data.id === value.roleId)[0]
          }
        }
        return item
      }))

      setregionDisabled(!regionDisabled)

      axios.patch(`/users/${currentRecord.id}`, value)
    })
  }
  return (
    <div>
      <Button type="primary" onClick={() => { setaddVisible(true) }} style={{ marginBottom: "10px" }}>添加用户</Button>
      <Table rowKey={item => "right" + item.id} size="small" loading={loading}
        dataSource={dataSource}
        columns={userColumns}
        pagination={{
          pageSize: 5
        }}
      />
      <Modal
        size="small"
        visible={addVisible}
        title="添加用户"
        okText="确认"
        cancelText="不加了"
        onCancel={() => {
          setaddVisible(false)
          addform.resetFields()
        }}
        onOk={() => {
          addOnOk()
        }}
      >
        <UserForm form={addform} roleList={roleList} regionList={regionList}></UserForm>
      </Modal>

      <Modal
        size="small"
        visible={updateVisible}
        title="编辑用户"
        okText="更新"
        cancelText="不改了"
        onCancel={() => {
          setupdateVisible(false)
          updateform.resetFields()
        }}
        onOk={() => {
          updateOnOk()
        }}
      >
        <UserForm form={updateform} roleList={roleList} regionList={regionList} regionDisabled={regionDisabled} isUpdate={true}></UserForm>
      </Modal>
    </div>
  )
}
