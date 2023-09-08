import { forwardRef, Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from 'src/authors/authors.model';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { Book } from 'src/books/books.model';
import { BooksModule } from 'src/books/books.module';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [
    SequelizeModule.forFeature([Author, Book]),
    forwardRef(() => AuthModule),
    FilesModule,
    BooksModule,
  ],
})
export class AuthorsModule {}
