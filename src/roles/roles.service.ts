import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
