import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { Product } from './product.entity';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([Category, Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
