import { PrismaClient } from "@prisma/client";
import prisma from "../../../../../infra/libs/prisma/client";
import { CategoryEntity } from "../../../domain/entity/category.entity";
import { CategoryRepositoryInterface } from "../../../domain/repository/categoryRepository.interface";

export class CategoryPrismaRepository implements CategoryRepositoryInterface {
  _prisma: PrismaClient

  constructor() {
    this._prisma = prisma
  }

  async getCategories(): Promise<CategoryEntity[]> {
    try {
      const categories = await this._prisma.category.findMany()
      return categories
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
  async create(category: CategoryEntity): Promise<CategoryEntity> {
    try {
      const createdCategory = await this._prisma.category.create({
        data: category
      })
      return createdCategory
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
  async update({id, name}: {id: number, name: string}): Promise<CategoryEntity> {
    try {
      const updatedCategory = await this._prisma.category.update({
        where: { id: +id },
        data: { name }
      })
      return updatedCategory
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
  async delete(id: number): Promise<CategoryEntity> {
    try {
      const deletedCategory = await this._prisma.category.delete({
        where: { id: +id }
      })
      return deletedCategory
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
  async getCategoryById(id: number): Promise<CategoryEntity> {
    try {
      const category = await this._prisma.category.findUnique({
        where: { id: +id }
      })
      return category as CategoryEntity
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
}