import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { LoggerService } from 'src/app/services/logger.service';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  logger: LoggerService;
  service: TodosService;

  todos: Todo[];

  constructor(logger: LoggerService, service: TodosService) {
    this.logger = logger;
    this.service = service;
  }

  classes(): string {
    return 'todos';
  }

  ngOnInit(): void {
    this.service.getTodos().subscribe(
      (response) => {
        if (response.ok) {
          this.todos = response.body;
          this.logger.log('Request successful !');
        }
        else {
          this.logger.log(`Request failed: ${response.status}.`);
        }
      }
    );
  }

  queryTodo(): void {
    this.service.queryTodo().subscribe(
      (response) => {
        if (response.ok) {
          this.todos.push(response.body);
          this.logger.log('Request successful !');
        }
        else {
          this.logger.log(`Request failed: ${response.status}.`);
        }
      }
    );
  }

  toggleTodo(todo: Todo): void {
    this.service.toggleTodo(todo).subscribe(
      (response) => {
        if (response.ok) {
          const idx = this.todos.indexOf(todo);
          const completed = this.todos[idx].completed;
          this.todos[idx].completed = !completed;
          this.logger.log('Request successful !');
        }
        else {
          this.logger.log(`Request failed: ${response.status}.`);
        }
      }
    );
  }

  deleteTodo(todo: Todo): void {
    this.service.deleteTodo(todo).subscribe(
      (response) => {
        if (response.ok) {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
          this.logger.log('Request successful !');
        }
        else {
          this.logger.log(`Request failed: ${response.status}.`);
        }
      }
    );
  }
}
