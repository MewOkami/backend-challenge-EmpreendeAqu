import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (findUser) {
      throw new ConflictException('Email already exists');
    }

    const user = new User();

    Object.assign(user, {
      ...createUserDto,
    });

    await this.prisma.user.create({
      data: { ...user },
    });

    return plainToInstance(User, user);
  }

  async findByEmail(email: string) {
    const findUser = await this.prisma.user.findFirst({
      where: { email },
    });

    return findUser;
  }

  async findAll() {
    const findUser = await this.prisma.user.findMany();
    return findUser;
  }
}
