import io from 'socket.io-client'
import $ from 'jquery'

const CHAT = {
  username: null,
  userid: null,
  color: null,
  socket: null,
  onlineCount: 0,
  onlineUsers: null,
  msgArr: [],
  photo: '',
  logout: function () {
    this.socket.disconnect()
    // location.reload()
  },
  //  提交弹幕消息内容
  submit: function (msg) {
    if (msg !== '') {
      var obj = {
        userid: this.userid,
        username: this.username,
        msg: msg,
        color: this.color,
        photo: this.photo
      }
      this.socket.emit('message', obj)
    } else {
      console.log('msg is null')
    }
    return false
  },
  genUid: function () {
    return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100)
  },
  //  更新系统消息，本例中在用户加入、退出的时候调用
  updateSysMsg: function (o, action) {
    //  当前在线用户列表
    this.onlineUsers = o.onlineUsers
    //  当前在线人数
    this.onlineCount = o.onlineCount
    //  新加入用户的信息
    //  var user = o.user
  },
  changeInfo () {
    this.userid = window.localStorage.getItem('userid')
    this.username = window.localStorage.getItem('name')
    this.color = window.localStorage.getItem('color')
    this.photo = window.localStorage.getItem('photo')
    this.socket.emit('changeInfo', {
      userid: this.userid,
      username: this.username,
      color: this.color,
      photo: this.photo
    })
  },
  randomColor: function () {
    return '#' + (~~(Math.random() * (1 << 24))).toString(16)
  },
  randomPhoto: function () {
    var photos = ['../static/img/cute.png', '../static/img/haha.gif', '../static/img/heisenberg.png', '../static/img/mj.gif', '../static/img/yaseng.png']
    return photos[parseInt(4 * Math.random())]
  },
  init: function () {
    /*
     客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
     实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
     */
    // this.userid = this.genUid()
    this.userid = window.localStorage.getItem('userid')
    this.username = window.localStorage.getItem('name')
    this.color = window.localStorage.getItem('color')
    this.photo = window.localStorage.getItem('photo')
    console.log('userid=' + this.userid)
    if (!this.userid) {
      return
    }
    // this.username = Math.floor(Math.random()*10)
    //  连接websocket后端服务器
    this.socket = io.connect('ws://192.168.1.55:3000/')
    //  告诉服务器端有用户登录
    this.socket.emit('login', {userid: this.userid, username: this.username, color: this.color, photo: this.photo})
    //  心跳包，30s左右无数据浏览器会断开连接Heartbeat
    setInterval(() => {
      this.socket.emit('heartbeat', 1)
    }, 10000)
    //  监听新用户登录
    this.socket.on('login', function (obj) {
      CHAT.updateSysMsg(obj, 'logout')
      CHAT.msgArr.push(obj)
    })

    this.socket.on('changeInfo', function (o) {
      CHAT.onlineUsers[o.userid] = o
      console.log(o)
    })
    //  监听用户退出
    this.socket.on('logout', function (o) {
      CHAT.updateSysMsg(o, 'logout')
    })
    //  监听消息发送
    this.socket.on('message', function (obj) {
      // var isme = (obj.userid == CHAT.userid) ? true : false
      var item = {
        'img': obj.photo,
        'info': obj.msg,
        'href': 'javascript:;',
        'close': false,
        'speed': 10,
        'bottom': 0,
        'color': obj.color
      }
      $('body').barrager(item)
      CHAT.msgArr.push(obj)
    })
  }
}
export default CHAT
