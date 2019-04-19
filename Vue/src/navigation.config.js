export default () => [
  {
    "id": "0",
    "name": "首页",
    "to": "/home",
    "icon": ["playmate", "icon-home"]
  },
  {
    "id": "1",
    "name": "平台管理",
    "icon": ["playmate","icon-desktop"],
    "children": [
      {
        "id": "1-1",
        "icon": ["playmate","icon-shenhe"],
        "name": "用户审核",
        "to": "/a"
      }
    ]
  }
]