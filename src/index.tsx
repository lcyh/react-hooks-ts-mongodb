import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Redirect } from "react-router-dom";//三个路由组件
import { Provider } from "react-redux";//负责把属性中的store传递给子组件
import store from "./store";//引入仓库
import { ConfigProvider } from "antd";//配置
import zh_CN from "antd/lib/locale-provider/zh_CN";//国际化中文
import "./assets/css/common.less";//通用的样式
import Tabs from "./components/Tabs";//引入底部的页签导航
import Home from "./routes/Home";//首页
import Mine from "./routes/Mine";//我的课程
import Profile from "./routes/Profile";//个人中心
import { ConnectedRouter } from 'connected-react-router';//redux绑定路由
import history from './store/history';
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ConfigProvider locale={zh_CN}>
                <main className="main-container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/mine" component={Mine} />
                        <Route path="/profile" component={Profile} />
                        <Redirect to="/" />
                    </Switch>
                </main>
                <Tabs />
            </ConfigProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);