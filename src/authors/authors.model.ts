import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Book } from 'src/books/books.model';

interface AuthorCreationAttrs {
  firstName: string;
  lastName: string;
}

@Table({ tableName: 'authors' })
export class Author extends Model<Author, AuthorCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @HasMany(() => Book)
  books: Book[];
}
