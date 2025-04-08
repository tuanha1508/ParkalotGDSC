import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

// Create Express instance
const server = express();

// For serverless use
let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server)
    );
    
    // Enable CORS for the frontend
    app.enableCors({
      origin: ['https://parkalot-gdsc.vercel.app', 'http://localhost:3001'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: 'X-Requested-With,Content-Type,Accept,Authorization',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
    
    // Add security headers middleware
    server.use((req, res, next) => {
      res.header('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;");
      next();
    });
    
    await app.init();
    cachedApp = app;
  }
  
  return cachedApp;
}

// For local development 
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(app => {
    app.listen(process.env.PORT ?? 3000);
  });
}

// Export handler for serverless
export const handler = async (req: any, res: any) => {
  const app = await bootstrap();
  server(req, res);
};

// Export express instance for Vercel
export default server;
