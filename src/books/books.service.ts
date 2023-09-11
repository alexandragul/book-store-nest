import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from 'src/books/books.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book) private bookRepository: typeof Book,
    private filesService: FilesService,
  ) {}

  async getBooks() {
    const books = await this.bookRepository.findAll();
    return books;
  }

  async createBook(dto: CreateBookDto, image: any) {
    let fileName;
    if (image) {
      await this.filesService.createFile(image);
    }
    const book = await this.bookRepository.create({ ...dto, ...(fileName && { image: fileName }) });
    return book;
  }

  async getBookById(bookId: number) {
    const book = await this.bookRepository.findByPk(bookId, { include: { all: true } });
    return book;
  }

  async deleteBookById(bookId: number) {
    const book = await this.bookRepository.findByPk(bookId);
    await book.destroy();
  }
}
