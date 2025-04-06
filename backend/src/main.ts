import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    // Enable CORS for all origins
    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: false,
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
