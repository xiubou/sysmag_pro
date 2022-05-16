# Xiubou's 新闻发布管理系统

### 开发工具：

React、Antd组件库、Echarts、Redux、json-server模拟后台数据

### 后台数据启动：

进入项目db文件夹，执行下方语句启动

`json-server --watch ./db.json --port 5000`

超级管理员登录：admin， 密码：123456

### 概述：

1、**登录页面**：

- 用户登录验证
- 界面粒子效果

2、首页：

- 卡片展示部分新闻点击浏览详情、柱状图、抽屉展示新闻分类饼状图

3、**用户管理**：

- 用户列表（删除用户、添加用户、修改用户）

4、**权限管理**：

- 角色列表（超级管理员、区域管理员、区域编辑 3个角色。可删除、修改角色，不同角色操作权限不同）

  区域管理员与区域编辑只可操作自己区域的

- 权限列表（查看、删除、编辑）

5、**新闻管理**：

- 撰写新闻
- 草稿箱（撰写后的新闻可存草稿箱或提交审核）
- 新闻分类（点击名称修改类名、删除）

6、**审核管理**：

- 审核新闻（点击查看详情，审核新闻，重新编辑或提交审核）
- 审核列表（查看新闻审核状态，具体内容等，可操作发布或驳回）

7、**发布管理**

- 待发布（除查看详情外，只可操作发布）
- 已发布（除查看详情外，只可操作下线）
- 已下线（除查看详情外，只可操作删除）



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
