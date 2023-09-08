import { InjectModel } from '@nestjs/sequelize';
import { Author } from 'src/authors/authors.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author) private authorRepository: typeof Author,
    private booksService: BooksService,
  ) {}

  async createAuthor(dto: CreateAuthorDto) {
    const author = await this.authorRepository.create(dto);
    return author;
  }

  async createBookByAuthor(authorId: number, dto: CreateBookDto, image) {
    const author = await this.authorRepository.findByPk(authorId);
    const book = await this.booksService.createBook(dto, image);

    if (!author) {
      throw new HttpException('Author has not been found', HttpStatus.NOT_FOUND);
    }

    if (author && book) {
      await author.$add('book', book.id);
    }

    return this.booksService.getBookById(book.id);
  }
}
