import React, { useEffect, useState, useRef } from 'react'
import { Card, Col, Row, List, Avatar, Drawer, Tooltip, Empty } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Chart from '../../../components/chart'  // 封装react-echarts组件
import homeJpg from '../../../static/home.jpg';
import awJpg from '../../../static/aw.jpg';
import axios from "axios"
import * as Echarts from 'echarts'
import _ from 'lodash'
import {pieOption} from '../../../static/staticData'
const { Meta } = Card;

export default function Home() {

  const [viewList, setviewList] = useState([])
  const [starList, setstarList] = useState([])
  const [visible, setvisible] = useState(false)
  const [pieChart, setpieChart] = useState(_.cloneDeep(pieOption))
  const barRef = useRef()
  // const pieRef = useRef()
  
  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then(res => {
      // console.log(res.data)
      setviewList(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6").then(res => {
      // console.log(res.data)
      setstarList(res.data)
    })
  }, [])

 
  // 官方写法 
  const renderBarView = (obj) => {
    let myChart = Echarts.init(barRef.current);

    // 指定图表的配置项和数据
    let option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          rotate: "45",
          interval: 0
        }
      },
      yAxis: {
        minInterval: 1
      },
      series: [{
        name: '数量',
        type: 'bar',
        data: Object.values(obj).map(item => item.length)
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


    window.onresize = () => {
      // console.log("resize")
      myChart.resize()
    }
  }

  const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {

    axios.get("/news?publishState=2&_expand=category").then(res => {
      // console.log(res.data)
      // console.log()
      renderBarView(_.groupBy(res.data, item => item.category.title))
      let option2 = _.cloneDeep(pieOption)
      let currentList = res.data.filter(item => item.author === username)
      let groupObj = _.groupBy(currentList, item => item.category.title)
      let list = []
      for (let i in groupObj) {
        list.push({
          name: i,
          value: groupObj[i].length
        })
      }
      option2.series[0].data = [...list]
      setpieChart(option2)
        // setallList(res.data)
    })

    return () => {
      window.onresize = null
    }
  }, [username])

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="最常浏览" bordered={false}>
            <List
              size="small"
              // bordered
              dataSource={viewList}
              renderItem={item => <List.Item>
                <Tooltip title="点击查看详情"><a href={`#/news-manage/preview/${item.id}`}>{item.title}</a></Tooltip>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="点赞前六" bordered={false}>
            <List
              size="small"
              // bordered
              dataSource={starList}
              renderItem={item => <List.Item>
                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card cover={
            <img
              alt="example"
              src={homeJpg}
            />
          }
            actions={[
              <Tooltip title="点击查看图表"><SettingOutlined key="setting" onClick={() => {
                //setTimeout(() => {
                  setvisible(true)
                  // init初始化
                  //renderPieView()
                //}, 0)
              }} /></Tooltip>,
              <Tooltip title="编辑(无)"><EditOutlined key="edit" /></Tooltip>,
              <Tooltip title="更多(无)"><EllipsisOutlined key="ellipsis" /></Tooltip>,
            ]}
          >
            <Meta
              avatar={<Avatar src={awJpg} />}
              title={username}
              description={
                <div>
                  <b>{region ? region : "全球"}</b>
                  <span style={{
                    paddingLeft: "30px"
                  }}>{roleName}</span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Drawer
        width="500px"
        title="个人新闻分类"
        placement="right"
        closable={true}
        onClose={() => {
          setvisible(false)
        }}
        visible={visible}
      >
        {
          pieChart.series[0] && pieChart.series[0].data.length === 0 ?
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: 70 }} /> :
            <div style={{ width: '100%',height: "400px",marginTop: "30px"}}>
              <Chart option={pieChart} height={270} />
            </div>
        }
      </Drawer>
      <div ref={barRef} style={{
                width: '100%',
                height: "400px",
                marginTop: "30px"
            }}></div>
      
    </div>
  )
}
