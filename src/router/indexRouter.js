import React from 'react'
import { HashRouter, Redirect, Route,Switch } from 'react-router-dom'
import Login from '../views/login/Login'
import News from '../views/newsforother/News'
import Details from '../views/newsforother/Details'
import NewsSandBox from '../views/sandbox/NewsSandBox'

export default function IndexRouter() {
    // console.log("token:",localStorage.getItem('token'))
    return (
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path="/news" component={News}/>
                <Route path="/detail/:id" component={Details}/>
                {/* <Router path='/' component={NewsSandBox}></Router> */}
                <Route path='/' render={()=>
                    localStorage.getItem('token') ? 
                    <NewsSandBox></NewsSandBox> :
                    <Redirect to='/login'/>
                }/>
            </Switch>
        </HashRouter>
    )
}
