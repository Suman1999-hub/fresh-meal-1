const express = require('express');
const pool = require('./db.config');
const ApiRoute = require('./routes/api.route');
const AuthRoute = require('./routes/auth.route');
const PaymentRoute = require('./routes/payment.route');
const cors = require('cors');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(`select * from menu`);

    res.json({ rows: result.rows });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Error');
  }
});

app.use('/api', ApiRoute);
app.use('/auth', AuthRoute);
app.use('/payment', PaymentRoute);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
