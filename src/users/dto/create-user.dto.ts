import { IsInt, Min, Max, Length, IsAlphanumeric } from 'class-validator';

export class CreateUserDto {
  @Length(3, 15)
  @IsAlphanumeric()
  login: string;

  @IsAlphanumeric()
  password: string;

  @IsInt()
  @Min(18)
  @Max(150)
  age: number;
}
