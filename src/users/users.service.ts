import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { SignUpUserDto } from './users.dto'

Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async creatUser({ email, password }: SignUpUserDto) {
    const user = this.usersRepository.create({
      email,
      password, 
    });

    return this.usersRepository.save(user);
  }

  authenticateUser() {
    return 'This action authenticates a user';
  }

  async updateUserPassword(id: string, password: string) {
    const user = await this.usersRepository.findOneBy({ id: parseInt(id) });

    if (!user) {
      return null;
    }

    user.password = password;
    return await this.usersRepository.save(user);
  }

  async findOne (id: string) {
    const user = await this.usersRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  find(password: string) {
    return this.usersRepository.findBy({ password })
  }

  async update (id: string, attr: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, attr);
    
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
