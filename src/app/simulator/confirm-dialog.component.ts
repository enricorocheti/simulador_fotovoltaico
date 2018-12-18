import { Component, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: []
})
export class ConfirmDialog {

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<ConfirmDialog>) { }

  close(clearData: boolean): void {
    this.dialogRef.close(clearData);
  }
 
}
