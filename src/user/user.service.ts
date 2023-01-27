import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequestDto } from 'src/gql/dto/addFriend.model';
import { Post } from 'src/post/post.entity';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';

// type UserRelationFields = Pick<User, 'friends' | 'likedPosts'>;
type MapReturnType = User[keyof User];
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

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findFriendsByUserIds(userIds: string[]): Promise<User[][]> {
    const users = await this.userRepository.find({
      where: { id: In(userIds) },
      relations: {
        friends: true,
      },
    });

    return this.mapFromUsersList(userIds, users, 'friends');
  }

  public async findLikedPostsByUserIds(userIds: string[]): Promise<Post[][]> {
    const users = await this.userRepository.find({
      where: { id: In(userIds) },
      relations: {
        likedPosts: true,
      },
    });

    return this.mapFromUsersList(userIds, users, 'likedPosts');
  }

  public async addFriend(addFriendDto: FriendRequestDto): Promise<User> {
    const user: User = await this.userRepository.findOneBy({
      id: addFriendDto.id,
    });

    const friend: User = await this.userRepository.findOneBy({
      id: addFriendDto.friendId,
    });

    if (!user.friends) {
      user.friends = [];
    }
    if (!friend.friends) {
      friend.friends = [];
    }

    friend.friends.push(user);
    user.friends.push(friend);

    this.userRepository.save(friend);
    return this.userRepository.save(user);
  }

  private mapFromUsersList<T>(
    userIds: string[],
    users: User[],
    path: keyof User,
  ): T[] {
    const groupedUserFriends: { [key: string]: MapReturnType } = users.reduce(
      (groupObject: { [key: string]: MapReturnType }, user: User) => {
        groupObject[user.id] = user[path];
        return groupObject;
      },
      {},
    );

    return userIds.map((userId) => groupedUserFriends[userId] || []) as T[];
  }
}

export { UserService };
