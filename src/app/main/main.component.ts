import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../todo';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  todos: Todo[];
  error:boolean;
  displayedColumns: string[] = ['todo', 'deadline', 'status'];

  constructor(
    private ds: DataService,
  ) {}

  ngOnInit(): void {
    this.ds.getTodo().subscribe(
      response => {
        this.todos = response as Todo[];
      },
      err => {
        console.log(err);
        this.error = true;
      }
    );
  }

}
