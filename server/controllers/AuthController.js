const pool = require('../db.config');
const bcrypt = require('bcrypt');

module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, phone, address, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const response = await pool.query(
        `insert into users(name, email, phone, address, password) 
            values($1, $2, $3, $4, $5) returning *;`,
        [name, email, phone, address, hashedPassword]
      );
      res.send('User Register Successfully');
    } catch (error) {
      console.error('Error : ' + error);
      res.status(500).send('Error in server');
    }
  },
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const response = await pool.query(
        `select * from users where email = $1 limit 1`,
        [email]
      );
      const user = response.rows[0];
      if (!user) return res.status(500).send('User not exist');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send('Email/Password is wrong');

      res.json({ user: user });
    } catch (error) {
      console.error('Error : ' + error);
      res.status(500).send('Error in server');
    }
  },
};
