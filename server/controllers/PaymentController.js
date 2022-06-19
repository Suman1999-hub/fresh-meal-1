const Razorpay = require('razorpay');
const pool = require('../db.config');

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
      const {
        amount,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        menuId,
        userId,
        count,
      } = req.body;
      console.log(req.body);
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
      const result = await pool.query(
        `INSERT INTO subscriptions (user_id, menu_id, count, value)
            VALUES
          ('${userId}', '${menuId}', '${count}', '${amount / 100}' );`
      );
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
