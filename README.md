# root file module

*** generate resource ***
nest g resource teen

*** generate controller ***
nest g controller product
nest g controller category
nest g controller user
nest g controller transaction
nest g controller order
nest g controller article
nest g controller menu

*** npm i mysql ***
npm install --save @nestjs/typeorm typeorm mysql2

npm install @nestjs/config

*** nest g class entities/product ***

## Document APi Swagger 

https://wanago.io/2022/02/14/api-nestjs-openapi-swagger/

npm install @nestjs/swagger swagger-ui-express

@ApiTags('Product') -> chia ra các api theo tag

## set prefix
app.setGlobalPrefix('api');

# validator
npm i --save class-validator class-transformer

# API Login, Get profile
link https://docs.nestjs.com/recipes/passport#implementing-passport-strategies
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
npm i --save @nestjs/jwt passport-jwt
npm i --save-dev @types/passport-jwt

# upload and update image user 
npm i @types/multer


# register user 
npm i @types/bcrypt bcrypt


