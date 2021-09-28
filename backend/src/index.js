const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')

const cats = require('./routes')

const app = express()
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    console.log('db connected')
  } catch (err) {
    console.log('db connection fail', err)
    process.exit()
  }
}
connectDB()

const PORT = process.env.PORT

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use((req, res, next) => {
  console.log(req.ip, req.method, res.statusCode)
  next()
})

app.use('/media', express.static(path.join(`${__dirname}`, 'uploads')));

app.use('/cats', cats);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error('# errorHandler:', err)
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  err.success = err.success ?? false

  res.status(err.status || 500).send({ message: err.message, success: err.success })
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})