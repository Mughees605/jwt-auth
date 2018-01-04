var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://mohsin123:mohsin123@ds239387.mlab.com:39387/mohsin-test';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

// mongodb://mohsin123:mohsin123@ds239387.mlab.com:39387/mohsin-test
// mongodb://localhost:27017/TodoApp