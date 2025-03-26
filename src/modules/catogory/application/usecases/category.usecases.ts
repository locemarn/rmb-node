import { CategoryEntity } from "../../domain/entity/category.entity";
import { CategoryRepository } from "../../infra/repository/category.repository";

export class CategoryUsecases {
  private _repository: CategoryRepository

  constructor(repository: CategoryRepository) {
    this._repository = repository
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return this._repository.getAllCategories()
  }

  async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    return this._repository.createCategory(category)
  }

  async updateCategory({id, name}: {id: number, name: string}): Promise<CategoryEntity> {
    return this._repository.updateCategory({id, name})
  }

  async deleteCategory(id: number): Promise<CategoryEntity> {
    return this._repository.deleteCategory(id)
  }

  async getCategoryById(id: number): Promise<CategoryEntity> {
    return this._repository.getCategoryById(id)
  } 
}