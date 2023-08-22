import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Product } from './product.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  /**
   * upload img to cloudinary service
   * @param file
   * @returns
   */
  async uploadImgToClodinary(file: Express.Multer.File) {
    return await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new HttpException('invalid type', HttpStatus.BAD_REQUEST);
    });
  }

  /**
   * create a new Product
   * @param createProductDto
   * @param file
   * @returns Product
   */
  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }
    const newImg = await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new HttpException('invalid type', HttpStatus.BAD_REQUEST);
    });

    const newProduct = await this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      image: newImg.url,
      price: createProductDto.price,
      category: category,
      unit: createProductDto.unit,
      quantity: createProductDto.quantity,
    });
    return await this.productRepository.save(newProduct);
  }
  /**
   * get  all Products
   * @returns Product
   */
  async findByCategory(categoryId: number): Promise<any> {
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    if (!category) {
      throw new HttpException('Category not found.', HttpStatus.BAD_REQUEST);
    }
    if (categoryId == undefined) {
      return await this.productRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.category', 'category')
        .getMany();
    }
    return await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category')
      .where('category.id = :categoryId', { categoryId: categoryId })
      .getMany();
  }
  // retu

  /**
   * serch product by name
   * @query name string
   * return Product object
   */
  async findbyname(name: string): Promise<Product[]> {
    const product = await this.productRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
    return product;
  }
}
