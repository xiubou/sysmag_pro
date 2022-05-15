// 自定义新闻发布hooks
import {useEffect, useState} from 'react'
import axios from 'axios'
import {notification} from 'antd'

function usePublish(type){
    const {username} = JSON.parse(localStorage.getItem('token'))
    const [dataSource,setDataSource] =useState([])

    useEffect(()=>{
        axios.get(`/news?author=${username}&publishState=${type}&_expand=category`).then(
            res=>{
                setDataSource(res.data)
            }
        )
    },[username,type])

    const handlePublish = (id)=>{
        let data = dataSource.filter(item=>item.id!==id)
        setDataSource(data)

        axios.patch(`/news/${id}`, {
            "publishState": 2, // 修改为2-已发布
            "publishTime":Date.now()
        }).then(res=>{
            notification.info({
                message: `通知`,
                description:
                  `已发布，您可以到【发布管理】- <已发布> 中查看新闻`,
                placement:"bottomRight"
            });
        })
    }
    const handleSunset = (id)=>{
        let data = dataSource.filter(item=>item.id!==id)
        setDataSource(data)

        axios.patch(`/news/${id}`, {
            "publishState": 3, // 修改为3-已下线
        }).then(res=>{
            notification.info({
                message: `通知`,
                description:
                  `新闻下线成功，您可以到【发布管理】- <已下线> 中查看您的新闻`,
                placement:"bottomRight"
            });
        })
    }

    const handleDelete = (id)=>{
        let data = dataSource.filter(item=>item.id!==id)
        setDataSource(data)

        axios.delete(`/news/${id}`).then(res=>{
            notification.info({
                message: `通知`,
                description:
                  `您已经删除了已下线的新闻`,
                placement:"bottomRight"
            });
        })

    }

    // 返回放啊
    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete
    }
}

export default usePublish