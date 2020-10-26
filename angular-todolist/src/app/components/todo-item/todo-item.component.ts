import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  @Input() todo: Todo;

  @Output() toggle = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();

  constructor() {}

  classes(): any {
    return {
      todo: true,
      'is-completed': this.todo.completed
    };
  }

  onToggle(buttonEvent: {target: HTMLButtonElement}): void {
    this.toggle.emit(this.todo);
  }

  onDelete(inputEvent: {target: HTMLInputElement}): void {
    this.delete.emit(this.todo);
  }
}
