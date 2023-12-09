import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { BooksService } from 'src/books/books.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createBook(@Body() dto: CreateBookDto, @UploadedFile() image) {
    return this.booksService.createBook(dto, image);
  }

  @Patch(':bookId')
  @UseInterceptors(FileInterceptor('image'))
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  updateBook(@Param('bookId') bookId: string, @Body() dto: CreateBookDto, @UploadedFile() image) {
    return this.booksService.updateBookById(Number(bookId), dto, image);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':bookId')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  deleteBook(@Param('bookId') bookId: string) {
    return this.booksService.deleteBookById(Number(bookId));
  }
}
