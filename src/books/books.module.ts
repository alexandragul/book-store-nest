import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { FilesModule } from 'src/files/files.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from 'src/books/books.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
    SequelizeModule.forFeature([Book]),
    FilesModule,
    RolesModule,
    AuthModule,
    CloudinaryModule,
    AuthorsModule,
  ],
  exports: [BooksService],
})
export class BooksModule {}
