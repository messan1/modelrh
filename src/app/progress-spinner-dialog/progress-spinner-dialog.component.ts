import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-progress-spinner-dialog',
  templateUrl: './progress-spinner-dialog.component.html',
  styleUrls: ['./progress-spinner-dialog.component.scss']
})
export class ProgressSpinnerDialogComponent implements OnInit {
  
  ngOnInit() {

  }

  message:any
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ProgressSpinnerDialogComponent>) {
    if (data) {
      this.message = data.message || this.message;
    }
    this.dialogRef.updateSize('100vw','300vw')
  }

}
