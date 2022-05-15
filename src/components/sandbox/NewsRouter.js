import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import Home from '../../views/sandbox/home/Home'
import UserList from '../../views/sandbox/usermanage/UserList'
import RightList from '../../views/sandbox/rightmanage/RightList'
import RoleList from '../../views/sandbox/rightmanage/RoleList'
import NoPermission from '../../views/sandbox/nopermission/NoPermission'
import AuditList from '../../views/sandbox/auditmanage/AuditList'
import AuditNews from '../../views/sandbox/auditmanage/AuditNews'
import NewsCategory from '../../views/sandbox/newsmanage/NewsCategory'
import NewsDraft from '../../views/sandbox/newsmanage/NewsDraft'
import NewsPreview from '../../views/sandbox/newsmanage/NewsPreview'
import NewsUpdate from '../../views/sandbox/newsmanage/NewsUpdate'
import NewsWrite from '../../views/sandbox/newsmanage/NewsWrite'
import Unpublished from '../../views/sandbox/publishmanage/Unpublished'
import Published from '../../views/sandbox/publishmanage/Published'
import Sunset from '../../views/sandbox/publishmanage/Sunset'

export default function NewsRouter() {

  const [BackRouteList, setBackRouteList] = useState([])

  useEffect(() => {
    Promise.all([
      axios.get("/rights"),
      axios.get("/children"),
    ]).then(res => {
      // console.log("NewsRouter res:", res)
      setBackRouteList([...res[0].data, ...res[1].data])
      // console.log(BackRouteList)
    })
  }, [])

  const LocalRouterList = {
    "/home": Home,
    "/user-manage/list": UserList,
    "/right-manage/role/list": RoleList,
    "/right-manage/right/list": RightList,
    "/news-manage/add": NewsWrite,
    "/news-manage/draft": NewsDraft,
    "/news-manage/category": NewsCategory,
    "/news-manage/preview/:id": NewsPreview,
    "/news-manage/update/:id": NewsUpdate,
    "/audit-manage/audit": AuditNews,
    "/audit-manage/list": AuditList,
    "/publish-manage/unpublished": Unpublished,
    "/publish-manage/published": Published,
    "/publish-manage/sunset": Sunset
  }
  
  // 检查路由权限是否关闭
  // 1-路径是否删除
  // 2-路径是否关闭：pagepermisson
  const checkRouter = (item) => {
    // console.log("checkRoute item:",item)
    return LocalRouterList[item.key] && (item.pagepermisson || item.routepermisson)
  }

   const {role:{rights}} = JSON.parse(localStorage.getItem("token"))
  // 当前登陆用户的权限列表
  const isUserPermission = (item) => {
    // console.log("rights:",rights)
    return rights.includes(item.key)
  }


  return (
    <Switch>
      {
        BackRouteList.map((item) => {
          return (checkRouter(item) && isUserPermission(item)) ? 
          <Route path={item.key} key={item.key} component={LocalRouterList[item.key]} exact />
          :
          null
        })
      }
      <Redirect from="/" to="/home" exact />
      {
        BackRouteList.length > 0 && <Route path="*" component={NoPermission} />
      }
    </Switch>
  )
}
