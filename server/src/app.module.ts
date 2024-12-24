import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true})],
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class AppModule {}
