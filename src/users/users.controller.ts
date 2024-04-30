import { Controller, Post, Body, BadRequestException, InternalServerErrorException, Param, NotFoundException, Patch, Delete, Get, Query } from '@nestjs/common';
import { SignUpUserDto, SignInUserDto, UpdatePasswordDto, UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpUserDto) {
    try {
      const user = await this.usersService.creatUser(body);
      return user;
    } catch (error) {
      if (/unique/i.test(error.message)) {
        return new BadRequestException('User with this email already exists');
      }

      return new InternalServerErrorException(error.message);
    }
  }

  @Post('sign-in')
  signIn(@Body() body: SignInUserDto) {
    console.log("sign-in", body);
    return 'Sign in';
  }

  @Patch('/update-password/:id')
  async updatePassword(@Body() body: UpdatePasswordDto, @Param('id') id: string) {
    const user = await this.usersService.updateUserPassword(id, body.password);

    if (!user) {
      return new NotFoundException('User not found');
    }

    return user;
  }

  @Get('/:id')
  findUser (@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  findAllUsers (@Query('password') password: string) {
    return this.usersService.find(password);
  }

  @Patch('/:id')
  updateUser (@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  removeUser (@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
