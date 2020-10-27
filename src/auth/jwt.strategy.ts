import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { User } from './user.entity'
import { UserRepository } from './user.repositoty'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      // calls the constructor of base Class (PassportStrategy)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51', // ToDo: should not be visible on git
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload
    const user = await this.userRepository.findOne({ username })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
