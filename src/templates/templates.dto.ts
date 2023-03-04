import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class TemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  tagline: string;

  @IsString()
  @IsNotEmpty()
  application: string;

  @IsUrl()
  @IsNotEmpty()
  thumbnailUrl: string;

  @IsArray()
  @IsNotEmpty()
  galleryImages: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUrl()
  @IsNotEmpty()
  fileUrl: string;

  @IsUrl()
  @IsNotEmpty()
  downloadUrl: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;

  @IsArray()
  @IsNotEmpty()
  plugins: string[];

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
