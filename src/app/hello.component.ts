import { HttpClient } from '@angular/common/http';
import { Component, Input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

declare const SwaggerUIBundle: any;

@Component({
  selector: 'hello',
  template: `
    <div style="width:300px" [formGroup]="formGroup">
      <h2 mat-dialog-title>Show Names</h2>
      <div mat-dialog-content>
        Hello {{ name }}
        <select formControlName="user">
        <option *ngFor="let user of users$ | async " [value]="user.id">
          {{user.name}}
        </option>
        </select>
      </div>
      <div mat-dialog-content>
      todos:
        <select formControlName="todo">
        <option *ngFor="let todo of todos$ | async " [value]="todo.id">
          {{todo.title}}
        </option>
        </select>
      </div>
      <div mat-dialog-actions align="end">
        <span>
          <button
            type="button"
            mat-flat-button
            color="primary"
            [mat-dialog-close]="true"
          >
            Clear
          </button>
          <button
            type="button"
            mat-stroked-button
            color="primary"
            (click)="CloseDialog()"
          >
            Cancel
          </button>
        </span>
      </div>
    </div>
  `,
})
export class HelloComponent {
  name: string;
  users$: Observable<any>;
  todos$: Observable<any>;
  userSelected = 2;
  formGroup: FormGroup;

  constructor(
    private _mdr: MatDialogRef<HelloComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.name = data.name;
    this.formGroup = this.fb.group({
      user: new FormControl(),
      todo: new FormControl(),
    });
  }
  CloseDialog() {
    this._mdr.close(false);
  }
  ngOnInit(): void {
    this.users$ = this.http.get('https://jsonplaceholder.typicode.com/users');
    this.todos$ = this.http.get('https://jsonplaceholder.typicode.com/todos');
    this.formGroup.patchValue({ user: 2 ,todo:1 });
  }
}
