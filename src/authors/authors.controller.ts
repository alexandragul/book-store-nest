import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post()
  createAuthor(@Body() authorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(authorDto);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post(':authorId')
  @UseInterceptors(FileInterceptor('image'))
  createBookByAuthor(
    @Param('authorId') authorId: string,
    @Body() bookDto: CreateBookDto,
    @UploadedFile() image,
  ) {
    return this.authorsService.createBookByAuthor(Number(authorId), bookDto, image);
  }
}
