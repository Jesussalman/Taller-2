import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { ManagerError } from 'src/common/errors/manage.error';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResponseAllCategories } from './interfaces/response-category.interface';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {

  private category: CategoryEntity[] = [
    { id: 1, name: "category1", description: "descr1", isActive: true },
    { id: 2, name: "category2", description: "descr2", isActive: true },
    { id: 3, name: "category3", description: "descr3", isActive: true },
    { id: 4, name: "category4", description: "descr4", isActive: true },
  ]
  create(createCategoryDto: CreateCategoryDto) {
    try {
      const category: CategoryEntity = {
        ...createCategoryDto,
        isActive: true,
        id: this.category.length+1,
      }
      if( !category ){
        throw new BadRequestException("Category not created!");
      }
  
      this.category.push(category); 
      return category
    } catch (error) {
      throw new InternalServerErrorException("500 Server Error");
    }
  }

  async findAll( paginationDto: PaginationDto):Promise< ResponseAllCategories > {
    try {

      if( this.category.length === 0 ){
        throw new ManagerError({
          type: "NOT_FOUND",
          message: "Categories not found!"
        });
      }
    
      const { page, limit } = paginationDto;
      const total = this.category.filter((category) => category.isActive===true).length

      const skip = ( page - 1 ) * limit;

      const lastPage = Math.ceil(total / limit);
      
      const data = this.category.slice( skip, limit );

      return {
        page,
        lastPage,
        total,
        limit,
        data
      }
      
    } catch (error) {
      ManagerError.createSignatureError( error.message )
    }
  }

  findOne(id: number) {
    try{
      const category = this.category.find(category => category.id === id && category.isActive === true)
      if(!category) throw new NotFoundException('Category not found')
      return category;
    }catch(error){
      throw new InternalServerErrorException('500 Server Error')
    }
  }

  update(id: number, updateCategoyDto: UpdateCategoryDto) {
    try { 
      let categoryDB = this.category.find(category => category.id === id)
      
      this.category = this.category.map(category => {
        if(category.id === id){
          categoryDB = {
            ...categoryDB,
            ...UpdateCategoryDto
          }
          return categoryDB
        }
        return category;
      })
  }
  catch{
    throw new InternalServerErrorException('500 Server Error')
  }
}

  delete(id: number) {
    try {
      const categoryDB = this.category.find(category => category.id === id)
      if(!categoryDB) throw new NotFoundException('Category not found')
      this.category = this.category.filter(category => category.id !== id)

      return 'Category deleted'
    } catch (error) {
      throw new InternalServerErrorException('500 Server Error')
    }
  }
}