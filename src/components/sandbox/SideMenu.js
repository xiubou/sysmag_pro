import React, {useEffect,useState} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {iconList} from '../../static/staticData'
import logoURL from '../../logo.png'
//css
import './index.css'
//antd
import { Layout, Menu, Avatar, Image } from 'antd';
const {  Sider } = Layout;

function SideMenu(props) {

    // const [current,setCurrent] = (['1'])
    const [menuList,setMenuList] = useState([])
    useEffect(()=>{
        axios.get("/rights?_embed=children").then(res=>{
            // console.log("getMenuData",res.data)
            setMenuList(res.data)
        })
    },[])

    //获取menuitem
    const getMenuItem = (data) => {
        // console.log("getMenuItem data:",data)
        let children = []
        // if(typeof(data.children)!=="undefined" && data.children.length > 0){
        if(data.children?.length > 0){
            data.children.forEach(citem => {
                if(checkPagePermission(citem)) children.push(getMenuItem(citem))
            })
        }

        let menuItem =  {
          key:data.key ? data.key:'',
          icon: iconList[data.key]? iconList[data.key] : null,
          label:data.title? data.title:'空',
          children: data.children?.length > 0 ? children : null
        }
        // console.log("getMenuItem menuItem:",menuItem)
        return menuItem
    }

    //将返回的菜单数据转为符合Menu组件的items数据
    const changeDataToMenuItem = (data)=>{
        let items=[]
        data.length && data.forEach(item => {
            // let children = []
            // if(item.children && item.children.length>0){
            //     item.children.forEach( citem => {
            //         children.push(getMenuItem(citem))
            //     })
            //     item.children = children
            // }
            items.push(getMenuItem(item))
        });
        // console.log('changeDataToMenuItem',items)
        return items
    }

    // 选择菜单后内容组件渲染
    const onSelectMenuItem = (item)=>{
        // console.log("onselect item:",item)
        props.history.push(item.key)
    }

    // 检查是否不属于页面权限以及角色权限
    const checkPagePermission = (item)=>{
        let {role:{rights}} = JSON.parse(localStorage.getItem("token"))
        // 区域管理看不到权限管理，区域编辑无用户管理
        return item.pagepermisson && rights.includes(item.key)
    }

    const selectKeys = [props.location.pathname]
    const openKeys = ["/"+props.location.pathname.split("/")[1]]
    return (
        <Sider trigger={null} collapsible collapsed={props.rightIsExpand}>
            <div style={{display:"flex",flexDirection:"column",height:'100%'}}>
                {props.rightIsExpand ? 
                    <Avatar src={<Image src={logoURL} style={{ width: 36 }} preview={false}/>} 
                            size={36} style={{ margin:"10px auto" }}/> 
                    : 
                    <div className="logo">Xiubou 新闻发布管理</div>
                }
                <div style={{flex:1,overflow:"auto"}}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        //defaultSelectedKeys={selectKeys}
                        defaultOpenKeys={openKeys}
                        onSelect = {onSelectMenuItem}
                        selectedKeys={selectKeys}
                        items={changeDataToMenuItem(menuList)}
                    />
                </div>
            </div>
        </Sider>
    )
}

const mapStateToProps  = (state) => {
    const {TopHeaderReducer:{rightIsExpand}} = state
    return {
        rightIsExpand
    }
}

export default connect(mapStateToProps)(withRouter(SideMenu))