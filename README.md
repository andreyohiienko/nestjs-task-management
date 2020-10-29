<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Important takeaways
- DTO - data transfer object
- class-validator
- class-transformer
- PostgreSQL
- [TypeORM](https://typeorm.io/)
- [JWT](https://jwt.io/)
- [Sometimes requires dist remove](https://github.com/typeorm/typeorm/issues/4498)
- execution path ```controller -> service -> repository```
- [https://docs.nestjs.com/techniques/logger](https://docs.nestjs.com/techniques/logger)
- set ```TYPEORM_SYNC: true``` on elastic beastalk initialization

### Nest Commands
- nest g module \<name\>
- nest g controller \<name\> --no-spec
- nest g service \<name\> --no-spec