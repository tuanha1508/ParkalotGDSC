import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for the frontend
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3001',
      'https://parkalot.vercel.app', // Add your production Vercel domain here
      'https://parkalot-gdsc-client.vercel.app', // Add the GDSC client domain
      /\.vercel\.app$/ // Allow all subdomains of vercel.app
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
