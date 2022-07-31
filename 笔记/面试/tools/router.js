const express = require("express");
const router = express.Router();
const alipaySdk = require("./paytool");
const AlipayFormData = require("alipay-sdk/lib/form").default;
const axios = require("axios");

router.post("/api/pcpay", (req, res) => {
  let orderId = req.body.orderId;
  // * 添加购物车支付支付宝 */
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  const formData = new AlipayFormData();
  formData.setMethod("get");
  // 通过 addField 增加参数
  // 在用户支付完成之后，支付宝服务器会根据传入的 notify_url，以 POST 请求的形式将支付结果作为参数通知到商户系统。
  formData.addField(
    "notifyUrl",
    "https://open.alipay.com/develop/sandbox/account"
  ); // 支付成功回调地址，必须为可以直接访问的地址，不能带参数
  formData.addField("bizContent", {
    outTradeNo: orderId, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
    productCode: "FAST_INSTANT_TRADE_PAY", // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
    totalAmount: "0.01", // 订单总金额，单位为元，精确到小数点后两位
    subject: "苹果", // 订单标题
    body: "一箱苹果", // 订单描述
  });
  formData.addField("returnUrl", "http://localhost:3000/支付宝支付.html"); //加在这里才有效果,不是加在bizContent 里面
  // 如果需要支付后跳转到商户界面，可以增加属性"returnUrl"
  const result = alipaySdk.exec(
    // result 为可以跳转到支付链接的 url
    "alipay.trade.wap.pay", // 统一收单下单并支付页面接口
    {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
    { formData: formData }
  );

  result.then((resp) => {
    res.send({
      success: true,
      message: "success",
      code: 200,
      timestamp: new Date().getTime(),
      result: resp,
    });
  });
});

// 支付交易查询
//支付查询
router.get("/query", function (req, res) {
  (async function () {
    const { orderId } = req.query;
    const formData = new AlipayFormData();
    formData.setMethod("get");
    formData.addField("bizContent", {
      outTradeNo: orderId,
    }); // 通过该接口主动查询订单状态
    const result = await alipaySdk.exec(
      "alipay.trade.query",
      {},
      {
        formData: formData,
      }
    );
    axios({
      method: "GET",
      url: result,
    })
      .then((data) => {
        let r = data.data.alipay_trade_query_response;
        if (r.code === "10000") {
          // 接口调用成功
          switch (r.trade_status) {
            case "WAIT_BUYER_PAY":
              res.send("交易创建，等待买家付款");
              break;
            case "TRADE_CLOSED":
              res.send("未付款交易超时关闭，或支付完成后全额退款");
              break;
            case "TRADE_SUCCESS":
              res.send("交易支付成功");
              break;
            case "TRADE_FINISHED":
              res.send("交易结束，不可退款");
              break;
          }
        } else if (r.code === "40004") {
          res.send("交易不存在");
        }
      })
      .catch((err) => {
        res.json({
          msg: "查询失败",
          err,
        });
      });
  })();
});

module.exports = router;
