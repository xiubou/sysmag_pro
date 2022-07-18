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

### PS-游客情况：

路径使用`http://localhost:3000/#/news` 登录游客系统可浏览所有新闻改变 ‘浏览量’ 和 ‘点赞量’。

### mindchart测试与pro无关
export const treeData = [{
    name: '阿巴阿巴',
    label: {
        backgroundColor: 'rgba(168, 0, 252, 1)',
        borderRadius: [22, 11, 11, 6],
        padding: [16, 16, 16, 16],
    },
    children: [
        {
            name: '产品1',
            idss: 1,
            collapsed: false,
            label: {
                backgroundColor: 'rgba(252, 25, 0, 1)',
                borderRadius: [22, 11, 11, 6],
                padding: [16, 16, 16, 16],
            },
            children: [
                {
                    name: '基线1',
                    children: [
                        { name: '基线1', value: 3938, collapsed: true, },
                        { name: '基线2', value: 3812, collapsed: true, },
                        { name: '基线3', value: 6714, collapsed: true, },
                        { name: '基线4', value: 743, collapsed: true, },
                    ],
                },
                {
                    name: '基线2',
                    children: [
                        { name: '基线1', value: 3534, collapsed: true, },
                        { name: '基线2', value: 5731, collapsed: true, },
                        { name: '基线3', value: 7840, collapsed: true, },
                        { name: '基线4', value: 5914, collapsed: true, },
                        { name: '基线5', value: 3416, collapsed: true, },
                    ],
                },
                {
                    name: '基线3',
                    children: [{ name: 'AspectRatioBanker', value: 7074 }],
                },
            ],
        },
        {
            name: '产品2',
            idss: 2,
            collapsed: true,
            label: {
                backgroundColor: 'rgba(242, 144, 7, 1)',
                borderRadius: [22, 11, 11, 6],
                padding: [16, 16, 16, 16],
            },
            children: [
                { name: '基线1', collapsed: true, },
                { name: '基线1', value: 1759, collapsed: true, },
                { name: '基线2', value: 2165, collapsed: true, },
                { name: '基线3', value: 586, collapsed: true, },
                { name: '基线4', value: 3331, collapsed: true, },
                { name: '基线5', value: 772, collapsed: true, },
                { name: '基线6', value: 3322, collapsed: true, },
            ],
        },
        {
            name: '产品3',
            idss: 3,
            collapsed: true,
            label: {
                backgroundColor: 'rgba(252, 248, 0, 1)',
                borderRadius: [22, 11, 11, 6],
                padding: [16, 16, 16, 16],
            },
            children: [
                { name: '基线1', value: 8833, collapsed: true, },
                { name: '基线2', value: 1732, collapsed: true, },
                { name: '基线3', value: 3623, collapsed: true, },
                { name: '基线4', value: 10066, collapsed: true, },
            ],
        },
    ],
}];

export const treeOption = {
    // 标题
    title: {
        text: '阿巴阿巴',
    },
    // 提示，滑过时展示数据
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return (
                [params.name] +
                '<br/>基线数量 : ' +
                [params.data.idss] +
                '<br/>资金(万元) : ' +
                [params.data.collapsed]
            );
        },
    },
    // 主要配置
    series: [
        {
            // 类型
            type: 'tree',
            // 数据源
            data: treeData,

            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',

            symbol: 'none', // symbolSize: 100,
            // 字体节点样式
            label: {
                backgroundColor: 'rgba(241, 191, 14, 1)',
                borderRadius: [22, 11, 11, 6],
                padding: [16, 16, 16, 16],
            },
            // 线条样式
            lineStyle: {
                color: 'rgba(221, 212, 212, 1)',
                curveness: 0.8,
                width: '0.5',
            },

            leaves: {},

            emphasis: {
                focus: 'descendant',
            },
            // 默认展开计几层
            initialTreeDepth: 1,

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
        },
    ],
}


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
