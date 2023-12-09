import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { omitBy, isNil } from 'lodash';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { Book } from 'src/books/books.model';
import { FilesService } from 'src/files/files.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book) private bookRepository: typeof Book,
    private filesService: FilesService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getBooks() {
    const books = await this.bookRepository.findAll({ include: { all: true } });
    return books;
  }

  async createBook(dto: CreateBookDto, image: any) {
    let cloudinaryImage;
    if (image) {
      cloudinaryImage = await this.cloudinaryService.uploadImage(image);
    }
    const book = await this.bookRepository.create({
      ...dto,
      ...(cloudinaryImage && { image: cloudinaryImage.url }),
    });
    return book;
  }

  async getBookById(bookId: number) {
    const book = await this.bookRepository.findByPk(bookId, { include: { all: true } });
    return book;
  }

  async updateBookById(bookId: number, dto: CreateBookDto, image: any) {
    const book = await this.bookRepository.findByPk(bookId, { include: { all: true } });

    if (book.image) {
      await this.cloudinaryService.destroyImage(book.image);
    }

    let newImage;
    if (image) {
      newImage = await this.cloudinaryService.uploadImage(image);
    }
    book.set(omitBy({ image: newImage.url, title: dto.title }, isNil));
    await book.save();

    return book;
  }

  async deleteBookById(bookId: number) {
    const book = await this.bookRepository.findByPk(bookId);
    await book.destroy();
  }
}
