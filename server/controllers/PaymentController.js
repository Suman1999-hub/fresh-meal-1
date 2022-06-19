const Razorpay = require('razorpay');

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      const instance = new Razorpay({
        key_id: 'rzp_test_n9TkHQwv8l54Oy',
        key_secret: 'U7KE7FdS2TPQPTecj3AQ5yvJ',
      });
      const options = {
        amount: req.body.amount,
        currency: 'INR',
      };
      const order = await instance.orders.create(options);
      if (!order) return res.status(500).send('Some error occured');
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  payOrder: async (req, res, next) => {
    try {
      const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
        req.body;
      // const newOrder = Order({
      //   isPaid: true,
      //   amount: amount,
      //   razorpay: {
      //     orderId: razorpayOrderId,
      //     paymentId: razorpayPaymentId,
      //     signature: razorpaySignature,
      //   },
      // });
      // await newOrder.save();
      console.log('payment successful');
      res.send({
        msg: 'Payment was successfull',
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
