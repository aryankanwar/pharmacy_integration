import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import routers from './routers';

// import router from './router';

const app = express();

app.use(cors({
    credentials: true,
  }));
  
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());
  
  const server = http.createServer(app);
  
  server.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
  });
  
  app.use('/', routers());

  export default app;