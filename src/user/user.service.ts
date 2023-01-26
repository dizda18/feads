import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  public async findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}

export { UserService };
