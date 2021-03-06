import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { Test } from '@nestjs/testing'
import { User } from './user.entity'
import { UserRepository } from './user.repositoty'

const mockCredentialsDto = {
  username: 'TestUsername',
  password: 'TestPassword',
}

describe('UserRepository', () => {
  let userRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile()

    userRepository = await module.get<UserRepository>(UserRepository)
  })

  describe('signUp', () => {
    let save

    beforeEach(() => {
      save = jest.fn()
      userRepository.create = jest.fn().mockReturnValue({ save })
    })

    it('successfully signs up the user', () => {
      save.mockResolvedValue(undefined)
      expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow()
    })

    it('throws a conflict exception as username already exists', async () => {
      save.mockRejectedValue({ code: '23505' })
      await expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        ConflictException,
      )
    })

    it('throws a conflict exception as username already exists', async () => {
      save.mockRejectedValue({ code: '123123' }) // unhandled error code
      await expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        InternalServerErrorException,
      )
    })
  })

  describe('validateUserPassword', () => {
    let user

    beforeEach(() => {
      userRepository.findOne = jest.fn()
      user = new User()
      user.username = 'TestUsername'
      user.validatePassword = jest.fn()
    })

    it('should return the username as validation is successful', async () => {
      userRepository.findOne.mockResolvedValue(user)
      user.validatePassword.mockResolvedValue(true)
      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      )
      expect(result).toEqual('TestUsername')
    })

    it('should return null as user cannot be found', async () => {
      user.validatePassword.mockResolvedValue(null)
      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      )
      expect(user.validatePassword).not.toHaveBeenCalled()
      expect(result).toBeNull()
    })

    it('should return null as password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(user)
      user.validatePassword.mockResolvedValue(false)
      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      )
      expect(user.validatePassword).toHaveBeenCalled()
      expect(result).toBeNull()
    })

    describe('hashPassword', () => {
      it('should call bcrypt.hash to generate a hash', async () => {
        bcrypt.hash = jest.fn().mockResolvedValue('testHash')
        expect(bcrypt.hash).not.toHaveBeenCalled()
        const result = await userRepository.hashPassword(
          'testPassword',
          'testSalt',
        )
        expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt')
        expect(result).toEqual('testHash')
      })
    })
  })
})
