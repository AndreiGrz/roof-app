import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(message: string, duration: number = 5000) {
    this.snackBar.open(message, '', {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    }); 
  }
}
