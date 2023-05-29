import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   * create a new category
   * @body {CreateCategoryDto}
   * @returns {CreateUsersDto} total price
   */
  async create(createCategoryDto: CreateCategoryDto): Promise<any> {
    const category = await this.categoryRepository.findOneBy({
      name: createCategoryDto.name,
    });
    if (category != null)
      throw new HttpException(
        'Category already exists',
        HttpStatus.BAD_REQUEST,
      );
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  /**
   * find category by id
   * @Param {id}
   * @returns {CreateUsersDto} total price
   */
  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id: id });
    if (!category)
      throw new HttpException(
        `Category ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    return category;
  }
  /**
   * get all categories
   * @returns {Category}
   */
  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  /**
   * Update category by id
   * @Param {id} number
   * @Body CategoryDto
   * @returns `Update category ${id} successfully`
   */
  async updateCategoryById(
    id: number,
    categoryDto: UpdateCategoryDto,
  ): Promise<any> {
    const category = await this.categoryRepository.findOneBy({ id: id });
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }
    await this.categoryRepository.update(
      { id: id },
      { name: categoryDto.name, description: categoryDto.description },
    );
    return new HttpException(
      `Update category ${id} successfully`,
      HttpStatus.OK,
    );
  }

  /**
   * Delete a category by id
   * @Param {id} number
   * @returns `Delete category ${id} successfully`
   */
  async deleteCategoryById(id: number): Promise<any> {
    const category = await this.categoryRepository.findOneBy({ id: id });
    if (!category)
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    await this.categoryRepository.delete({ id: id });
    return new HttpException(
      'Category deleted successfully',
      HttpStatus.BAD_REQUEST,
    );
  }

  async checkCategory(id: number): Promise<any> {
    const category = await this.categoryRepository.findOneBy({ id: id });
    if (!category)
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
  }
}
