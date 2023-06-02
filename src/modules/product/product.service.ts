import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

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
    const products = await this.productRepository.find();
    // return products;

    // console.log(products);
    return await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category')
      .where('category.id = :categoryId', { categoryId: categoryId })
      .getMany();
  }
  // retu

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

// export class FormDataValidationPipe implements PipeTransform<CreateProductDto> {
//   async transform(value: CreateProductDto, metadata: ArgumentMetadata) {
//     const { metatype } = metadata;

//     if (!metatype || !this.toValidate(metatype)) {
//       return value;
//     }

//     const object = plainToClass(metatype, value);
//     const errors = await validate(object);
//     if (errors.length > 0) {
//       throw new BadRequestException('Validation failed');
//     }
//     return value;
//   }

//   private toValidate(metatype: any): boolean {
//     const types = [String, Boolean, Number, Array, Object];
//     return !types.includes(metatype);
//   }
// }
