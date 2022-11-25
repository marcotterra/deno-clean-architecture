import { Inject, Injectable } from 'danet/mod.ts';
import type { UserRepository } from '~/domain/ports/user.repository.ts';
import { User } from '../../domain/entities/user.entity.ts';

export class UserService {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = new User(user);

    const response = await this.userRepository.create(newUser);

    return response;
  }
}
