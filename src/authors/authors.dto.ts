import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class AuthorDto {
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  avatarUrl: string;
}
