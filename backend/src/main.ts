import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomeValidationPipe } from './custome-validation/custome-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Gắn prefix '/api' cho toàn bộ controller
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new CustomeValidationPipe());

  // Kích hoạt CORS cho tất cả các nguồn (hoặc chỉ những nguồn cụ thể)
  app.enableCors({
    //origin: 'http://localhost:3001', // Thêm URL của React app nếu cần
    origin: process.env.CORS_ORIGIN || '*',
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
