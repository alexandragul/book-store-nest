import { InjectModel } from '@nestjs/sequelize';
import { Author } from 'src/authors/authors.model';
import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author) private authorRepository: typeof Author) {}

  async createAuthor(dto: CreateAuthorDto) {
    const author = await this.authorRepository.create(dto);
    return author;
  }

  async getAuthors() {
    const authors = await this.authorRepository.findAll({ include: { all: true } });
    return authors;
  }

  async getAuthorById(authorId: number) {
    const author = await this.authorRepository.findByPk(authorId, { include: { all: true } });
    return author;
  }
}
