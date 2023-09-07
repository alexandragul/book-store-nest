import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Has to be string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @IsString({ message: 'Has to be string' })
  @Length(4, 16, { message: 'Has to be less that 16 but more that 4' })
  readonly password: string;
}
