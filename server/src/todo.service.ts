import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ToDo } from '@prisma/client';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async add(title: string, description:string): Promise<ToDo | null> {
    return await this.prismaService.toDo
      .create({
        data: {
          title: title,
          description: description,
          status: false,
        },
      })
      .catch((e) => {
        this.logger.error(e);
        return null;
      });
  }

  async update(id: string): Promise<ToDo | null> {
    const todo = await this.prismaService.toDo
      .findFirst({ where: { id } })
      .catch((e) => {
        this.logger.error(e);
        return null;
      });
    if (!todo) {
      this.logger.error(`Todo с ID ${id} не найдена`);
      return null;
    }
    const { status } = todo;
    return await this.prismaService.toDo
      .update({
        where: { id },
        data: {
          status: !status,
        },
      })
      .catch((e) => {
        this.logger.error(e);
        return null;
      });
  }

  async updateDescription(id: string, description: string): Promise<ToDo | null> {
    const todo = await this.prismaService.toDo
      .findFirst({ where: { id } })
      .catch((e) => {
        this.logger.error(e);
        return null;
      });
    if (!todo) {
      this.logger.error(`Todo с ID ${id} не найдена`);
      return null;
    }
    return await this.prismaService.toDo
      .update({
        where: { id },
        data: {
          description: description,
        },
      })
      .catch((e) => {
        this.logger.error(e);
        return null;
      });
  }

  async delete(id: string) {
    const todo = await this.prismaService.toDo
      .findFirst({ where: { id } })
      .catch((e) => {
        this.logger.error(e);
        return false;
      });
    if (!todo) {
      this.logger.error(`Todo с ID ${id} не найдена`);
      return false;
    }
    return await !!this.prismaService.toDo
      .delete({ where: { id } })
      .catch((e) => {
        this.logger.error(e);
        return false;
      });
  }

  async getTodos(): Promise<ToDo[] | null> {
    return this.prismaService.toDo
      .findMany({ orderBy: { createdAt: 'desc' } })
      .catch((e) => {
        this.logger.error(e);
        return null;
      });
  }

  async findTodos (todo:string): Promise<ToDo[]>{
    return await this.prismaService.toDo.findMany({where:{OR:[{title: { mode: 'insensitive', contains: todo }},{description: { mode: 'insensitive', contains: todo } }]}})
  }
}
