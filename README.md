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

```
<?php

namespace App\Libraries;

use App\Models\Consume;
use EasyWeChat\Factory;

class WxPayLibrary
{
    private $config;
    private $lib;

    public function __construct(Factory $factory)
    {
        $this->config = [
            // 必要配置
            'app_id' => env('MINA_APP_ID'),
            'mch_id' => env('WxPAY_MCH_ID'),
            'key'    => env('WxPAY_KEY'),   // API 密钥

            // 如需使用敏感接口（如退款、发送红包等）需要配置 API 证书路径(登录商户平台下载 API 证书)
            // 'cert_path' => env('WxPAY_CERT_PATH'), // 注意: 绝对路径！！！！
            // 'key_path'  => env('WxPAY_KEY_PATH'),  // 注意: 绝对路径！！！！

            'notify_url' => env('WxPay_NOTIFY_URL'),  // 你也可以在下单时单独设置来想覆盖它
            // 'sandbox'    => true, // 微信支付 沙箱测试环境
        ];

        $this->lib = $factory::payment($this->config);
    }

    /**
     * 打包订单信息
     * @param $consume
     * @param $openid
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     */
    public function packOrderInfo($consume, $openid)
    {
        $data = [
            'body'         => $consume->title,
            'out_trade_no' => $consume->consume_sn,
            'total_fee'    => bcmul($consume->paid_amount, 100),

            // 'spbill_create_ip' => '127.0.0.1', // 可选，如不传该参数，SDK 将会自动获取相应 IP 地址
            // 'notify_url'       => env('WxPay_NOTIFY_URL'), // 支付结果通知网址，如果不设置则会使用配置里的默认地址

            'trade_type' => 'JSAPI',
            'openid'     => $openid,
        ];

        return $this->lib->order->unify($data);
    }

    /**
     * 根据商户订单编号consume_sn查询订单支付状态
     * @param $consume_sn
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     */
    public function getPaidResultByConsumeSn($consume_sn)
    {
        return $this->lib->order->queryByOutTradeNumber($consume_sn);
    }

    /**
     * 撤销订单
     * @param $consume_sn
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     */
    public function revokeOrder($consume_sn)
    {
        return $this->lib->reverse->byOutTradeNumber($consume_sn);
    }

    /**
     * 生成数据签名
     * @param $data
     * @return string
     */
    public function getPaySign($data)
    {
        $str = 'appId=' . env('MINA_APP_ID') .
            '&nonceStr=' . $data['nonceStr'] .
            '&package=' . $data['package'] .
            '&signType=MD5&timeStamp=' . $data['timeStamp'] .
            '&key=' . env('WxPAY_KEY');

        return md5($str);
    }
}
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
