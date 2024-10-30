import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoryModule } from 'src/category/category.module';
import { CategoriesService } from 'src/category/category.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService],
  imports : [CategoryModule]
})
export class ProductsModule {}
