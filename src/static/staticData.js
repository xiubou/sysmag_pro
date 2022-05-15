import {
    HomeOutlined,
    KeyOutlined,
    UserOutlined,
    ReadOutlined,
    ZoomInOutlined,
    SendOutlined

} from '@ant-design/icons';

export const iconList = {
    "/home": <HomeOutlined />,
    "/user-manage": <UserOutlined />,
    "/right-manage": <KeyOutlined />,
    "/news-manage": <ReadOutlined />,
    "/audit-manage": <ZoomInOutlined />,
    "/publish-manage": <SendOutlined />
}

export const userTableData = [
    {
        key: '1',
        username: 'John Brown',
        age: 32,
        region: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
        action: ['del', 'edit'],
    },
    {
        key: '2',
        username: 'Jim Green',
        age: 42,
        region: 'London No. 1 Lake Park',
        tags: ['loser'],
        action: ['del', 'edit'],
    },
    {
        key: '3',
        username: 'Joe Black',
        age: 32,
        region: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
        action: ['del', 'edit'],
    },
]

export const rightTableData = [
    {
        key: '1',
        title: '首页',
        url: '/home',
        action: ['del', 'edit'],
    },
    {
        key: '2',
        title: '首页',
        url: '/home',
        action: ['del', 'edit'],
    },
    {
        key: '3',
        title: '首页',
        url: '/home',
        action: ['del', 'edit'],
    },
]

export const particleParams = {
    "background": {
        "color": {
            "value": "#1a273e"
        },
        "position": "50% 50%",
        "repeat": "no-repeat",
        "size": "cover"
    },
    "fullScreen": {
        "zIndex": 1
    },
    "interactivity": {
        "events": {
            "onClick": {
                "enable": true,
                "mode": "push"
            },
            "onHover": {
                "enable": true,
                "mode": "grab",
                "parallax": {
                    "enable": true,
                    "force": 60
                }
            }
        },
        "modes": {
            "bubble": {
                "distance": 400,
                "duration": 2,
                "opacity": 0.8,
                "size": 40,
                "divs": {
                    "distance": 200,
                    "duration": 0.4,
                    "mix": false,
                    "selectors": []
                }
            },
            "grab": {
                "distance": 400
            },
            "repulse": {
                "divs": {
                    "distance": 200,
                    "duration": 0.4,
                    "factor": 100,
                    "speed": 1,
                    "maxSpeed": 50,
                    "easing": "ease-out-quad",
                    "selectors": []
                }
            }
        }
    },
    "particles": {
        "color": {
            "value": "#ffffff"
        },
        "links": {
            "color": {
                "value": "#ffffff"
            },
            "distance": 150,
            "enable": true,
            "opacity": 0.4
        },
        "move": {
            "attract": {
                "rotate": {
                    "x": 600,
                    "y": 1200
                }
            },
            "enable": true,
            "outModes": {
                "bottom": "out",
                "left": "out",
                "right": "out",
                "top": "out"
            }
        },
        "number": {
            "density": {
                "enable": true
            }
        },
        "opacity": {
            "random": {
                "enable": true
            },
            "value": {
                "min": 0.1,
                "max": 0.5
            },
            "animation": {
                "enable": true,
                "speed": 3,
                "minimumValue": 0.1
            }
        },
        "size": {
            "random": {
                "enable": true
            },
            "value": {
                "min": 0.1,
                "max": 10
            },
            "animation": {
                "enable": true,
                "speed": 20,
                "minimumValue": 0.1
            }
        }
    }
}

export const particlesParams2 = {
    "background": {
        "color": {
            "value": "#092250"
        },
        "position": "50% 50%",
        "repeat": "no-repeat",
        "size": "cover"
    },
    "fullScreen": {
        "zIndex": 1
    },
    "interactivity": {
        "events": {
            "onClick": {
                "enable": true,
                "mode": "push"
            },
            "onHover": {
                "enable": true,
                "mode": "repulse"
            }
        },
        "modes": {
            "bubble": {
                "distance": 400,
                "duration": 2,
                "opacity": 0.8,
                "size": 40,
                "divs": {
                    "distance": 200,
                    "duration": 0.4,
                    "mix": false,
                    "selectors": []
                }
            },
            "grab": {
                "distance": 400
            },
            "repulse": {
                "divs": {
                    "distance": 200,
                    "duration": 0.4,
                    "factor": 100,
                    "speed": 1,
                    "maxSpeed": 50,
                    "easing": "ease-out-quad",
                    "selectors": []
                }
            }
        }
    },
    "particles": {
        "color": {
            "value": "#4eabf6"
        },
        "links": {
            "color": {
                "value": "#ffffff"
            },
            "distance": 150,
            "enable": true,
            "opacity": 0.4
        },
        "move": {
            "attract": {
                "rotate": {
                    "x": 600,
                    "y": 1200
                }
            },
            "enable": true,
            "path": {},
            "outModes": {
                "bottom": "out",
                "left": "out",
                "right": "out",
                "top": "out"
            },
            "spin": {}
        },
        "number": {
            "density": {
                "enable": true
            },
            "value": 80
        },
        "opacity": {
            "random": {
                "enable": true
            },
            "value": {
                "min": 0.1,
                "max": 0.5
            },
            "animation": {
                "enable": true,
                "speed": 3,
                "minimumValue": 0.1
            }
        },
        "size": {
            "random": {
                "enable": true
            },
            "value": {
                "min": 0.1,
                "max": 5
            },
            "animation": {
                "enable": true,
                "speed": 20,
                "minimumValue": 0.1
            }
        },
        "twinkle": {
            "lines": {
                "enable": true,
                "frequency": 0.005,
                "color": {
                    "value": "#55c1ec"
                }
            },
            "particles": {
                "enable": true,
                "color": {
                    "value": "#0c5985"
                }
            }
        }
    }
}

export const pieOption = {
    title: {
      text: '当前用户新闻分类图示',
      // subtext: '',
      left: 'center'
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: '#fff',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
        {
            name: '发布数量',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                }
            }
        }
    ]
  };