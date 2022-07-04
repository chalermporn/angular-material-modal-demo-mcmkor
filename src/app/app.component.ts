import { Component } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { HelloComponent } from "./hello.component";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  matDialogRef: MatDialogRef<HelloComponent>;
  name: string = "";
  constructor(private matDialog: MatDialog) {}
  OpenModal() {
    this.matDialogRef = this.matDialog.open(HelloComponent, {
      data: { name: this.name },
      disableClose: true
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
        this.name = "";
      }
    });
  }

  ngOnInit() {}
}
