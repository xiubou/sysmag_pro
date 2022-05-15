import React, { useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd'

const { Option } = Select

function UserForm(props) {

    const { roleList, regionList, form, regionDisabled } = props
    const [regionIsDisabled, setregionIsDisabled] = useState(false)

    const roles = {
        "1":"superadmin",
        "2":"admin",
        "3":"editor"
    }

    useEffect(() => {
        setregionIsDisabled(regionDisabled)
    }, [regionDisabled])

    const {roleId,region}  = JSON.parse(localStorage.getItem("token"))
    // 验证角色权限
    const checkRoleRights = (item, type) => {
        if(roles[roleId]==="superadmin") return false
        else{
            switch (type) {
                case "role": 
                    return props.isUpdate ? true : roles[item.id]!=="editor"    
                case "region":
                    return props.isUpdate ? true : item.value !== region
                default:
                    return true
            }
        }
    }

    return (
        <Form
            form={form}
            labelCol= { {sm:{span: 4},xs:{span:24}} }
            wrapperCol= { {sm:{span: 20},xs:{span:24}} }
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密 码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角 色"
                rules={[
                    {
                        required: true,
                        message: '请选择角色',
                    },
                ]}
            >
                <Select
                    onChange={(value) => {
                        if (value === 1) {
                            setregionIsDisabled(true)
                            form.setFieldsValue({
                                region: ""
                            })
                        } else {
                            setregionIsDisabled(false)
                        }
                    }}
                    allowClear={true}
                >
                    {
                        roleList.map(
                            item => <Option value={item.id} disabled={checkRoleRights(item,"role")} key={"role" + item.id}>{item.roleName}</Option>
                        )
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="region"
                label="区 域"
                rules={
                    regionIsDisabled ? [] : [
                        {
                            required: true,
                            message: '请选择用户所属区域',
                        },
                    ]}
            >
                <Select disabled={regionIsDisabled}
                    allowClear={true}
                >
                    {
                        regionList.map(item => <Option value={item.value} disabled={checkRoleRights(item,"region")} key={"region" + item.id}>{item.title}</Option>
                        )
                    }
                </Select>
            </Form.Item>
        </Form>
    )
}
export default UserForm