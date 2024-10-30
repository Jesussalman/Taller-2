import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.development`,
      isGlobal: true,
    }),
    UsersModule,
    ProductsModule,
    CommonModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
