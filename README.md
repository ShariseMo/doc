# php 大法

> Trait

- Trait 能解决 php 的单继承问题
-

> 事务：Transaction

- PDO::beginTransaction();

```
DB::beginTransation();  // 启动一个事务
DB::commit();   // 结束事务并提交
DB::rollback();  // 将回滚对数据库做出的更改，并将数据库连接返回到自动提交模式
```

一般会在事务这里加上 try-catch 判断

```
try{
    DB::beginTransation();
    // TODO: 一些业务代码
    DB::commit();
}catch(Exception $e){
    DB::rollback();  // 检测到异常则回滚
}
```

> try--catch(){}

- try/catch/finally 语句用于处理代码中可能出现的错误信息，语法错误等
- try 语句：定义执行时进行错误测试的代码段
- catch 语句：定义 try 代码发生错误时执行的代码
- finally 语句： 在 try 和 catch 之后无论有无异常都会执行
- catch 和 finally 语句都是可选的，但是在使用 try 语句之后必须至少使用一个
- 当错误发生时，JavaScript 会停止执行，并生成一个错误信息，使用 throw 语句来抛出异常。将 throw 华为 try-catch 一起使用，就可以控制程序输出的错误信息

# 微信支付

- 小程序支付：https://developers.weixin.qq.com/miniprogram/dev/api/api-pay.html#wxrequestpaymentobject

```
wx.requestPayment({
   'timeStamp': '',     // 【必传】当前的时间
   'nonceStr': '',      // 【必传】随机字符串，长度为32个字符以下
   'package': '',       // 【必传】统一下单接口返回的prepay_id参数值，提交格式：prepay_id = ***
   'signType': 'MD5',   // 【必传】签名算法，暂支持Md5
   'paySign': '',       // 【必传】签名
   'success':function(res){
   },
   'fail':function(res){
   }
})
```

- 商户系统和微信支付系统主要交互：

  - 小程序内调用登录接口，获取到用户的 openid
  - 商户 server 调用支付统一下单 统一下单 API： https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1&index=1
  - 商户 server 调用再次签名 再次签名 API： https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3
  - 商户 server 接收支付通知 支付结果通知 API： https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_7
  - 商户 server 查询支付结果 查询订单 API： https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_2

- 生成随机数算法：微信支付 API 接口协议中包含字段 nonce_str，主要保证签名不可预测。生成随机数算法如下：调用随机数函数生成，将得到的值转换为字符串。
- 签名算法：签名生成通用步骤：
  - 设所有发送或者接收到的数据为集合 M，将 M 内非空参数值的参数进行字典排序（按照参数名 ASCII 码从小到大排序），
  - 使用 URL 键值对的格式拼接成字符串 stringA ： key1=value&key2=value2
  - 在 stringA 的最后面拼接上 key（商户 API 密钥）得到 stringSignTemp 字符串，并对 stringSignTemp 进行 MD5 运算
  - 将得到的字符串转为大写 strtoupper($str)，得到 sign 值 signValue

```
// 传送的参数
$data = [
    'appid'  => 'fdshgfhjdsg',
    'mch_id' => '10258666',
    'device_info'  => 1000,
    'body'  => 'test',
    'nonce_str'  => 'hdfshfDSFDSF'
];
$stringA = 'appid=fdshgfhjdsg&body=test&device_info=1000&mch_id=10258666&nonce_str=hdfshfDSFDSF';
$stringSignTemp = $stringA + '&key=hfdjshfjdshfhj3h4k2h4k32';   // key是商户平台设置的密钥key
$sign = MD5($stringSignTemp)->toUpperCase();    // MD5签名：8932758923950hsfisfsdfsd
// 最终得到的要发送的数据
<xml>
<appid>fdshgfhjdsg</appid>
<mch_id>10258666</mch_id>
<device_info>1000</device_info>
<body>test</body>
<nonce_str>hdfshfDSFDSF</nonce_str>
<sign>$sign</sign>
</xml>
```

# KAILAS 会员注册流程

新用户--开通会员卡代码流程 openMemberCard

- 验证手机号和验证码：$mobile + $captcha
- 检测 CRM 中是否有该用户信息 users/user_lib getUserByMobile
- 验证用户在 ERP 中是否已经存在，如果已存在，则执行绑定老会员操作 checkIsOldUserInERP
- 获取用户微信信息 wechat/wechat_lib getWeChatByUserId
  users/user_lib updateUserInfo
- 信息发送至 ERP utils/log_util erp_info_lib sendNewUserInfoToERP
- 更新会员卡号 users/user_card_lib updateData

```
 // 更新会员卡号
$where = array(
    'user_id' => $user_id
);
$updateData = array(
    'card_no'    => $erpRes['data']['mbill'],
    'wx_card_id' => isset($result['data']['cardId']) ? $result['data']['cardId'] : '1',
    'level'      => 1,
    'status'     => 1
);
$this->load->library('users/user_card_lib');
$updateRes = $this->user_card_lib->updateData($where, $updateData);
if ($updateRes['code'] != lang('code_success')) {
    $this->load->library('utils/log_util');
    $this->log_util->error($updateRes);
}
```

- 会员等级变化日志 member/member_upgrade_log_lib add
