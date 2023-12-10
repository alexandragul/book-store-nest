import { forwardRef, Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from 'src/authors/authors.model';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [SequelizeModule.forFeature([Author]), forwardRef(() => AuthModule), FilesModule],
  exports: [AuthorsService],
})
export class AuthorsModule {}
