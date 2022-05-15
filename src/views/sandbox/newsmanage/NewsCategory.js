import React, { useState, useEffect, useRef, useContext } from 'react'
import { Button, Table, Modal, Form, Input, Tooltip } from 'antd'
import axios from 'axios'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal

export default function NewsCategory() {

  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    axios.get("/categories").then(res => {
      setDataSource(res.data)
    })
  }, [])

  const handleSave = (record) => {
    // console.log(record)
    setDataSource(dataSource.map(item => {
      if (item.id === record.id) {
        return {
          id: item.id,
          title: record.title,
          value: record.title
        }
      }
      return item
    }))

    axios.patch(`/categories/${record.id}`, {
      title: record.title,
      value: record.title
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      render: title => <Tooltip title='点击可重定义类名'><span style={{ cursor: 'pointer' }}>{title}</span></Tooltip>,
      onCell: (record) => ({
        record,
        editable: true,  // 可编辑
        dataIndex: 'title',
        title: '栏目名称',
        handleSave: handleSave,  // 结果回调
      }),

    },
    {
      title: "操作",
      render: (item) => {
        return <Tooltip title='删除'>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
        </Tooltip>
      }
    }
  ];


  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      okText:"确定！",
      cancelText:"取消",
      onOk() {
        //   console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });

  }
  //删除
  const deleteMethod = (item) => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`/categories/${item.id}`)
  }

  const EditableContext = React.createContext(null);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        let values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };


  return (
    <div>
      <Table dataSource={dataSource} columns={columns} size="small"
        pagination={{
          pageSize: 5
        }}
        rowKey={item => "newscategory" + item.id}

        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          }
        }}

      />
    </div>
  )
}
