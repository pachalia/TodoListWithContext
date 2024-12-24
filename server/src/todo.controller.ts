import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ToDo } from '@prisma/client';

interface CreateTodoDto extends Pick<ToDo, 'title' | 'description'>{}
interface UpdateTodoDescription extends Pick<ToDo, 'id' | 'description'>{}



@Controller('api')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('')
  getTodos () {
    return this.todoService.getTodos()
  }

  @Post()
  addTodo(@Body() {title, description}:CreateTodoDto) {
    return this.todoService.add(title, description)
  }

  @Get('find')
  findTodo (@Query('todo')todo:string) {
    return this.todoService.findTodos(todo)
  }



  @Put('description')
  updateDescription(@Body() {id,description}: UpdateTodoDescription ){
    return this.todoService.updateDescription(id, description)
  }

  @Delete(':id')
  deleteTodo(@Param('id') id:string){
    return this.todoService.delete(id)
  }

  @Put(':id')
  updateTodoStatus(@Param('id') id:string ){
    return this.todoService.update(id)
  }
}
