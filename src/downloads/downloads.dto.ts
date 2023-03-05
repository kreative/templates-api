import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DownloadDto {
  @IsString()
  @IsNotEmpty()
  templateId: string;

  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @IsString()
  @IsNotEmpty()
  userAgent: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @IsBoolean()
  @IsNotEmpty()
  sendNewsletter: boolean;
}
