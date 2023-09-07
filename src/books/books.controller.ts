import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { BooksService } from 'src/books/books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createBook(@Body() dto: CreateBookDto, @UploadedFile() image) {
    return this.booksService.createBook(dto, image);
  }
}
