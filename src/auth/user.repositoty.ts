import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials'
import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const user = new User() // entity
    user.username = username
    user.password = password

    await user.save()
  }
}
