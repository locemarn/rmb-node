import { CategoryEntity } from '../entity/category.entity'

export interface CategoryRepositoryInterface {
  getCategories(): Promise<CategoryEntity[]>
  create(category: CategoryEntity): Promise<CategoryEntity>
  update({id, name}: {id: number, name: string}): Promise<CategoryEntity>
  delete(id: number): Promise<CategoryEntity>
  getCategoryById(id: number): Promise<CategoryEntity>
}
