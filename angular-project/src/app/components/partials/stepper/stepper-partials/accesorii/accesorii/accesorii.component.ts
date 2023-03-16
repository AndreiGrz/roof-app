import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Accesorii, TableColumn } from 'src/app/models/models';
import { MatTableDataSource } from "@angular/material/table";
import { MatSelectChange } from '@angular/material/select';
import { MainService } from 'src/app/services/main.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-accesorii',
  templateUrl: './accesorii.component.html',
  styleUrls: ['./accesorii.component.scss']
})

export class AccesoriiComponent implements OnInit{

  public tableColumns: TableColumn[];
	public tableDisplayedColumns: string[];
  public tableDataSource: MatTableDataSource<Accesorii>;
  public hasValueSelected: boolean = false;
  public selectedOption: any = null;
  @Input() necesarAccesorii: any
  @Output() btnProceedToPrice = new EventEmitter<any>();


  accesoriiSuplimentare: any[];

  public accesorii: Accesorii[];
  constructor( private formBuilder: FormBuilder, private mainService: MainService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    //get data from ExtraMeasurementsComponent
  }

  ngOnInit(){
    this.accesorii = this.necesarAccesorii ? this.necesarAccesorii.necesarAccesorii: [];

    if(this.accesorii.length > 0){
      this.accesorii = this.accesorii.filter(item => item && item.qty > 0);
    }

    this.createTable();
    this.getAccesoriiSuplimentare();
  }

  private getAccesoriiSuplimentare (){ //se face req la initializarea stepper-ului
    this.mainService.getAccesoriiSuplimentare().subscribe( {
      next: (accesoriiSuplimentare) =>{
        this.accesoriiSuplimentare = accesoriiSuplimentare.results;
      },
      error: (err: HttpErrorResponse) =>{
        console.log(err.error.message);
      }
    });
  }


  private createTable(): void {
		this.tableColumns = [
			{ key: 'label', label: 'Produs', template: false },
			{ key: 'qty', label: 'Cantitate', template: true },
			{ key: 'actions', label: '', template: true }
		];

		this.tableDisplayedColumns = this.tableColumns.map((x) => x.key);
		this.tableDataSource = new MatTableDataSource(this.accesorii);
	}

  public deleteRow = (index: number, elem: any):void => {
    // const index = this.tableDataSource.data.indexOf(elem.name);
    if(index != -1){
      this.tableDataSource.data.splice(index, 1); //will delete latest row, should be added id
    }
    this.createTable();
  }

  public onSelectChange = (event: MatSelectChange):void => {
    this.selectedOption = event.value;
    if(Object.keys(this.selectedOption).length > 0){
      this.hasValueSelected = true;
    }
  }

  public addValueToTable = ():void => {
    let data: any = { label: this.selectedOption.label, price: this.selectedOption.price, qty: 1};
    this.tableDataSource.data.push(data);  
    this.createTable();
  }

  public proceedToPrice(){
    this.btnProceedToPrice.emit(this.accesorii);
  }

  // public changeQuantity (element: Accesorii): void {
  //   console.log(element)
  //   console.table(this.tableDataSource.data);
  // }
}
