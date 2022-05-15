import React from 'react'
import { Layout,  Dropdown, Avatar, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {changeRightIsExpand} from '../../redux/reducers/TopHeaderReducer'

const { Header } = Layout;

function TopHeader(props) {

    const changeCollapsed = () => {
        //改变state的isCollapsed
        // console.log("TopHeader props:",props)
        props.changeRightIsExpand()  // reducer
        // props.changeCollapsed()
    }

    const {username,role:{roleName}} = JSON.parse(localStorage.getItem("token"))

    const items = [
        { 
            label: roleName,
            key:'admin'
        },
        { 
            label: '退出',
            key:'exit',
            danger:true,
            onClick:()=>{
                localStorage.removeItem("token")
                // console.log(props.history)
                props.history.replace("/login")
            }
        }
    ];


    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {
                props.rightIsExpand ? <MenuUnfoldOutlined style={{fontSize:'1.2em'}} onClick={changeCollapsed} /> : <MenuFoldOutlined style={{fontSize:'1.2em',color:'#1890ff'}} onClick={changeCollapsed} />
            }
            <div style={{ float: "right" }}>
                <span>
                    欢迎
                    <span style={{color:"#1890ff"}}>{username}</span>
                    回来&nbsp;
                </span>
                <Dropdown overlay={<Menu items={items} />} >
                    <Avatar size="normal" style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         a:1
//     }
// }

const mapStateToProps = (state) => {
    const {TopHeaderReducer: {rightIsExpand}} = state  // 解构赋值
    return {
        rightIsExpand
    }
}
const mapDispatchToProps = {
    changeRightIsExpand
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TopHeader))