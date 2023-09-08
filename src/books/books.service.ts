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

  async createBook(dto: CreateBookDto, image: any) {
    const fileName = await this.filesService.createFile(image);
    const book = await this.bookRepository.create({ ...dto, image: fileName });
    return book;
  }

  async getBookById(bookId: number) {
    const book = await this.bookRepository.findByPk(bookId, { include: { all: true } });
    return book;
  }
}
