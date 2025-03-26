import { CategoryEntity } from "../../domain/entity/category.entity"
import { CategoryRepositoryInterface } from "../../domain/repository/categoryRepository.interface"

export class CategoryRepository {
  private _repository: CategoryRepositoryInterface

  constructor(repository: CategoryRepositoryInterface) {
    this._repository = repository
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    try {
      const categories = await this._repository.getCategories()
      return categories
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get categories')
    }
  }

  async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    try {
      const createdCategory = await this._repository.create(category)
      return createdCategory
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create category')
    }
  }

  async updateCategory({id, name}: {id: number, name: string}): Promise<CategoryEntity> {
    try {
      const updatedCategory = await this._repository.update({id, name})
      return updatedCategory
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update category')
    }
  } 

  async deleteCategory(id: number): Promise<CategoryEntity> {
    try {
      const deletedCategory = await this._repository.delete(id)
      return deletedCategory
    } catch (error) {
      console.error(error)
      throw new Error('Failed to delete category')
    }
  }

  async getCategoryById(id: number): Promise<CategoryEntity> {
    try {
      const category = await this._repository.getCategoryById(id)
      return category
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get category by id')
    }
  }
  
}