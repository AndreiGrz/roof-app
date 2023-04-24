import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/env';
@Component({
  selector: 'calculator-personalizat',
  templateUrl: './calculator-personalizat.component.html',
  styleUrls: ['./calculator-personalizat.component.scss'],
})
export class CalculatorPersonalizatComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('cpForm') cpForm: NgForm;

  fileList: File[] = [];
  formData = new FormData();
  cpFg: FormGroup;

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.createForm();
  }

  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.fileList.push(selectedFile);
      this.formData.append(`image[${i}]`, selectedFile);
    }
  }

  removeSelectedFile(index: number) {
    this.fileList.splice(index, 1);
    this.formData.delete(`image[${index}]`);
  }

  submitCp() {
    if (this.cpFg.invalid) {
      Object.values(this.cpFg.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if (!this.fileList.length) {
      this.snackbarService.showSnackBar('Trebuie sa incarcati fisierele!');
      return;
    }

    this.formData.append('nume', this.cpFg.get('nume')?.value);
    this.formData.append('prenume', this.cpFg.get('prenume')?.value);
    this.formData.append('email', this.cpFg.get('email')?.value);
    this.formData.append('adresa', this.cpFg.get('adresa')?.value);
    this.formData.append('telefon', this.cpFg.get('telefon')?.value);

    const url = `${environment.apiUrl}/uploadFiles`;
    this.http.post(url, this.formData).subscribe({
      next: () => {
        this.snackbarService.showSnackBar('Fisiere incarcate cu succes!');
      },
      error: () => {
        this.snackbarService.showSnackBar('Eroare in incarcarea fisierelor!');
      },
      complete: () => {
        this.reset();
      }
    });
  }

  private reset(): void {
    this.fileList = [];
    this.formData = new FormData();
    this.fileInput.nativeElement.value = '';
    this.cpForm.resetForm({ updateOn: 'submit' });
  }

  private createForm() {
    this.cpFg = this.fb.group({
      nume: ['', Validators.required],
      prenume: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresa: ['', Validators.required],
      telefon: ['', Validators.required]
    });
  }
}
