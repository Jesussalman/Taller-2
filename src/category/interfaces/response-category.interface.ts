import { CategoryEntity } from "../entities/category.entity";

export interface ResponseAllCategories{
    page: number;
    lastPage: number;
    total: number;
    limit: number;
    data: CategoryEntity[];
}