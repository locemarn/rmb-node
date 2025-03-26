import { CategoryUsecases } from "../../application/usecases/category.usecases";
import { CategoryEntity } from "../../domain/entity/category.entity";
import { CategoryPrismaRepository } from "../database/prisma/categoryPrisma.repository";
import { CategoryRepository } from "../repository/category.repository";

export class CategoryGraphqlController {
  private _prismaRepo: CategoryPrismaRepository
  private _categoryRepo: CategoryRepository
  private _categoryUsecases: CategoryUsecases

  constructor() {
    this._prismaRepo = new CategoryPrismaRepository()
    this._categoryRepo = new CategoryRepository(this._prismaRepo)
    this._categoryUsecases = new CategoryUsecases(this._categoryRepo)
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    try {
      const categories = await this._categoryUsecases.getAllCategories()
      return categories
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    console.log('GraphqlCategoryController createCategory')
    try {
      const createdCategory = await this._categoryUsecases.createCategory(category)
      return createdCategory
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async updateCategory({id, name}: {id: number, name: string}): Promise<CategoryEntity> {
    return this._categoryUsecases.updateCategory({id, name})
  }

  async deleteCategory(id: number): Promise<CategoryEntity> {
    return this._categoryUsecases.deleteCategory(id)
  }

  async getCategoryById(id: number): Promise<CategoryEntity> {
    return this._categoryUsecases.getCategoryById(id)
  }
}