import { PartialType } from '@nestjs/mapped-types';
import { CreateTableProductDto } from './create-table_product.dto';

export class UpdateTableProductDto extends PartialType(CreateTableProductDto) {}
