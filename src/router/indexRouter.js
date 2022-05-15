import React from 'react'
import { HashRouter, Redirect, Route,Switch } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'

export default function IndexRouter() {
    // console.log("token:",localStorage.getItem('token'))
    return (
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login}/>
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
