import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todo: Todo = {
    _id: '',
    input: '',
    deadline: '',
    status: ''
  };
  id = null;
  error = false;
  update = true;

  constructor(
    private _snackBar: MatSnackBar,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuild:FormBuilder
  ) { }
  todoForm=this.formBuild.group({
    input: ["", [Validators.required, Validators.minLength(500)]],
    deadline: ["", [Validators.required]],
    status: ["", [Validators.required]],
  })
  input = this.todoForm.get("input");
  deadline = this.todoForm.get("deadline");
  status = this.todoForm.get("status");

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // jika ada parameter id di URL
      if (params.get('id')) {
        this.id = params.get('id');

        this.ds.getIdTodo(this.id).subscribe(
          response => {
            this.todo = response as Todo;
          },
          err => {
            console.log(err);
            this.error = true;
          }
        );
      } else {
        this.update = false;
      }
    });
  }

  postTodo() {
    this.ds.postTodo(this.todo).subscribe(response => {
      // tampilkan notifikasi
      this.openSnackBar("Added", null)
      this.router.navigate(['/main']);
    });
  }

  deleteTodo() {
    this.ds.deleteTodo(this.todo).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Deleted", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateTodo() {
    this.ds.updateTodo(this.todo).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Status Updated", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
