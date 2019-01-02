# 企业微信开发

企业管理员可以使用企业微信 API，为企业接入个性化办公应用
API：通讯录管理、用用管理、消息推送、身份验证、移动端 SDK、素材、OA 数据接口、企业支付、电子发票等

> wx.qy.login()

wx.qy.login() 获取到 code，换取 user_id，session_key 和用户所在企业的 corpid

微信与企业微信平台差异性

- 账号体系
  - 小程序在微信端运行时：wx.login，wx.getUserInfo 获取相对于当前微信个人用户的身份信息
  - 小程序在企业微信端运行： wx.qy.login 获取当前企业微信用户相对于当前企业的员工身份信息

获取当前运行环境
调用接口 wx.getSystemInfo 获取。[在小程序 launch 时获取当前运行环境，并作为全局变量进行缓存]
在企业微信运行时，会额外返回一个 environment:'wxwork',在微信里运行则不返回该字段。

<img  src="/wechat/images/wechat-login.png" />

```
//app.js
App({
  onLaunch: function() {
    wx.qy.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }
})
```

服务端解析： https://qyapi.weixin.qq.com/cgi-bin/miniprogram/jscode2session?access_token=ACCESS_TOKEN&js_code=CODE&grant_type=authorization_code

> 获取企业成员信息

wx.qy.getEnterpriseUserInfo [调用之前先检查 login 的 session 是否过期，checkSession 检查当前登录态]

```
wx.qy.getEnterpriseUserInfo({
  success: function(res){
    var userInfo = res.userInfo
    var rawData = res.rawData     // 不包含敏感信息的原始数据字符串，用于计算签名
    var signature = res.signature   // 使用sha1(rawData + sessionkey) 得到字符串，用于校验用户信息
    var encryptedData = res.encryptedData   // 包括敏感数据在内的完整用户信息的加密数据
    var iv = res.iv   // 加密算法的初始向量
  }
})
```
