import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Password } from './model/passWord/passWord.model';
import { PasswordService } from './service/passWord.service';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'challengeFront';

  public password = '';
  public loading = false;

  constructor(private service: PasswordService, public dialog: MatDialog) {

  }


  save(): void {
    this.loading = true;
  }

  public checkPassword() {
    this.loading = true;
    this.service.checkPassword(new Password(this.password)).subscribe(data => {
      const dialogRef = this.dialog.open(Dialog, {
        data: { message: data.message }
      });

      dialogRef.afterClosed().subscribe(response => {
        this.password = '';
      })
    }, (error) => {
      if (error.status === 400) {
        const dialogRef = this.dialog.open(Dialog, {
          data: { message: error.error.message }
        });

        dialogRef.afterClosed().subscribe(response => {
          this.password = '';
        })
      } else {
        const dialogRef = this.dialog.open(Dialog, {
          data: { message: "O serviço está indisponivel no momento" }
        });

        dialogRef.afterClosed().subscribe(response => {
          this.password = '';
        })
      }
    }).add( () => {
      this.loading = false;
    });
  }
}


@Component({
  selector: 'dialog-elements',
  templateUrl: 'dialog-elements.html',
})
export class Dialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
