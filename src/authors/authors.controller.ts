import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post()
  createAuthor(@Body() authorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(authorDto);
  }

  @Get()
  getAuthors() {
    return this.authorsService.getAuthors();
  }
}
