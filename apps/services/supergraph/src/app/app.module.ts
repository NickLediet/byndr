import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV !== 'production',
      typePaths: ['./**/*.graphqls'],
      definitions: {
        path: join(process.cwd(), 'src/generated/graphql.ts'),
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
