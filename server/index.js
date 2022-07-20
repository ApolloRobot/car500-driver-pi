import { join , resolve} from 'path'
import Koa from 'koa'
import R from 'ramda'
import chalk from 'chalk'
import config from '../config'
import fs from 'fs';
import path from 'path'

var mqtt=require('mqtt')

// const MIDDLEWARES = ['database', 'general', 'router', 'parcel']
const iccidlocal = path.resolve(__dirname, '../', 'config/iccidlocal.txt')
var iccid=fs.readFileSync(iccidlocal)
var iccidstr=iccid.toString()
console.log('iccid--->>>',iccid.toString())
// var HID = require('node-hid')
// console.log('hid--dev--->>>',HID.devices())
// var hid = new HID.HID(4933,16388)
// hid.on('data',function(data){
//   console.log('hid-data--->>>',data)
// })

const nodegamepad = require('apollocontroller')
let gamepad = new nodegamepad('ps3');
// let gamepad = new nodegamepad('kt_pc900_bananapi');

gamepad.connect(function(){
  console.log('connected--<<<start');
})

gamepad.on('connected', function () {
    console.log('connected--<<<joy');
});
gamepad.on('disconnected', function () {
    console.log('disconnected');
});


var clientId = `mqtt_${iccidstr}`
var client = mqtt.connect(
//   process.env.NODE_ENV === 'development'
// ? `mqtt://localhost:1883`
// : `mqtt://broker.mnoiot.com:1883`
`mqtt://broker.mnoiot.com:1883`
,{
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'mno',
  password: '81525782',
  reconnectPeriod: 1000,
});
// Options的配置选项:
// {
//   keepAlive: // 心跳时间 默认60s, 设置0为禁用
//   username: // 用户名
//   password: // 用户密码
//   protocol: // 指定协议默认为ws(websocket) wss这是加密的websocket, 和http与https的差别差不多, 还有ssl, tcp...
//   clientId: // 客户端id 唯一标识你的客户端的身份
//   clean: // boolean  设置为 false 以在离线时接收 QoS 1 和 2 消息；
//   reconnectionProid: //设置多长时间进行重新连接 单位毫秒
//   connectionTimeout: // 设置超时时间
//   protocolID: ‘ MQIsdp’// 和下面的参数指定mqtt的版本 5的最新的, 3
//   protocolVersion: 3 
//   reconnection: // boolean 断开是否需要再次连接 不传默认为true
//   will: {
//     ... // 这里面配置的连接强制断开
//   }
// }


client.on('connect', function () {

    console.log('>>> connected')


//方向盘和油门数值变化后触发事件，对事件进行监听
      gamepad.on('JOYL:move', function (e) {
        // console.log('JOYL-move-->>>',e);
        let carmsg=JSON.stringify(e)
        client.publish(`/car_${iccidstr}`,carmsg)
      });
      
      gamepad.on('JOYR:move', function (e) {
        // console.log('JOYR-move-->>>',e);
        let carmsg=JSON.stringify(e)
            client.publish(`/car_${iccidstr}`,carmsg)
      });
//灯光按键触发事件      
      gamepad.on('Start:press', function () {
          console.log('start');
          client.publish(`/car_${iccidstr}`,'start')
      });
//换挡按键触发事件
      gamepad.on('halfhalf:press', function () {
        console.log('halfhalf');
        client.publish(`/car_${iccidstr}`,'halfhalf')
      });

      gamepad.on('half:press', function () {
        console.log('half');
        client.publish(`/car_${iccidstr}`,'half')
      });

      gamepad.on('one:press', function () {
        console.log('one');
        client.publish(`/car_${iccidstr}`,'one')
      });
 
 })

 client.on('message', function (topic, message) {

  // message is Buffer
 
  console.log(message.toString())
 
 })