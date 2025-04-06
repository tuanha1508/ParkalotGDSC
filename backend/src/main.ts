import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    // Enable CORS for the frontend
    app.enableCors({
      origin: [
        process.env.FRONTEND_URL || 'http://localhost:3001',
        'https://parkalot.vercel.app', // Add your production Vercel domain here
        'https://parkalot-gdsc-client.vercel.app', // Add the GDSC client domain
        'https://parkalot-4hjjg3jvk-tuanhai508s-projects.vercel.app', // Add the specific subdomain from the error
        /\.vercel\.app$/ // Allow all subdomains of vercel.app
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    });
    
    console.log('Starting server on port:', process.env.PORT ?? 3000);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('MongoDB URI is set:', !!process.env.MONGO_URI);
    console.log('Google Maps API Key is set:', !!process.env.GOOGLE_MAPS_API_KEY);
    
    await app.listen(process.env.PORT ?? 3000);
    console.log('Server successfully started');
  } catch (error) {
    console.error('Failed to start server:', error);
    throw error;
  }
}
bootstrap();
