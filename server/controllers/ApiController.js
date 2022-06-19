const pool = require('../db.config');

module.exports = {
  getMenuSubscriptions: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await pool.query(
        `select * from menu where type = '${id}'`
      );
      const dataSortedByDecreasing = result.rows.sort(
        (a, b) => b.price - a.price
      );

      res.json({ rows: dataSortedByDecreasing });
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
  postFeedback: async (req, res, next) => {
    const { user_id, value } = req.body;

    if (!user_id || !value) {
      return res.json({});
    }
    try {
      const result = await pool.query(
        `INSERT INTO feedback (value, user_id)
        VALUES
            ('${value}', '${user_id}');`
      );

      res.json({ rows: result.rows });
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
  getFeedback: async (req, res, next) => {
    try {
      const result = await pool.query(
        `select users.id as userId, value, created_date, name
        from users inner join feedback
        on users.id = feedback.user_id order by created_date desc`
      );

      console.log(result);

      res.json({ rows: result.rows });
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
  getUserProfile: async (req, res, next) => {
    const id = req.params.id;

    try {
      const result = await pool.query(
        `select * from users where users.id = '${id}'`
      );
      const subscriptionRes = await pool.query(
        `select * from subscriptions where user_id = '${id}'`
      );
      const menuId = subscriptionRes.rows && subscriptionRes.rows[0].menu_id;
      const dayLeft = subscriptionRes.rows && subscriptionRes.rows[0].count;

      const menu = await pool.query(
        `select * from menu where id = '${menuId}'`
      );

      res.json({ rows: result.rows, menu: menu.rows, dayLeft: dayLeft });
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
  patchUserProfile: async (req, res, next) => {
    const id = req.params.id;
    const { name, email, phone, address } = req.body;

    try {
      const result = await pool.query(
        `UPDATE users
        SET 
        name = '${name}',
        email = '${email}',
        phone = '${phone}',
        address = '${address}'
        WHERE id = '${id}'
        RETURNING *;`
      );

      res.json({ rows: result.rows });
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
  getSubscriptions: async (req, res, next) => {
    try {
      const result = await pool.query(`select * from subscriptions`);
      let totalVegSubscriptions = 0;
      result.rows.forEach((item) => {
        if (item.type === 'veg') totalVegSubscriptions++;
      });

      const totalMixedSubscriptions = result.rowCount - totalVegSubscriptions;

      res.json({
        rows: result.rows,
        totalSubscriptions: result.rowCount,
        totalMixedSubscriptions: totalMixedSubscriptions,
        totalVegSubscriptions: totalVegSubscriptions,
      });
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
};
