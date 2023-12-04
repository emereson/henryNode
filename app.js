const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const path = require('path');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/error.controllers');
const { rateLimit } = require('express-rate-limit');
const xss = require('xss-clean');

const usersRouter = require('./routes/users.routes');
const blogRouter = require('./routes/blog.routes');
const dataPhotographsRouter = require('./routes/dataPhotographs.routes');
const dataVideosRouter = require('./routes/dataVideos.routes');
const homeRouter = require('./routes/home.routes');
const photographsRouter = require('./routes/photographs.routes');
// const storiesRouter = require('./routes/stories.routes');
const storiesSliceRouter = require('./routes/storiesSlice.routes');
const videosRouter = require('./routes/videos.routes');

const app = express();

app.set('trust proxy', 1);
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'too many request from this IP , please try again in one hour ',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.use(xss());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(hpp());

app.use('/api/v1', limiter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/dataPhotographs', dataPhotographsRouter);
app.use('/api/v1/dataVideos', dataVideosRouter);
app.use('/api/v1/home', homeRouter);
app.use('/api/v1/photographs', photographsRouter);
app.use('/api/v1/storiesSlice', storiesSliceRouter);
app.use('/api/v1/videos', videosRouter);
app.use('/api/v1/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/images', express.static(path.join(__dirname, 'images')));

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this seerver! 💀`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
