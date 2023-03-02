import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Accesorii, TableColumn } from 'src/app/models/models';
import { MatTableDataSource } from "@angular/material/table";
import { MatSelectChange } from '@angular/material/select';

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
  public selectedOption: string;

  public accesorii: Accesorii[] = [
    {name: 'Coama', cantitate: 1},
    {name: 'Bordura metalica', cantitate: 4},
    {name: 'Opritor din plastic', cantitate: 6},
    {name: 'Holtsuruburi de alea bune', cantitate: 9},
    {name: 'Set cos fum', cantitate: 10},
    {name: 'Coama mica', cantitate: 12},
    {name: 'Folie anti-condens', cantitate: 14}
  ];
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.createTable();
  }


  private createTable(): void {
		this.tableColumns = [
			{ key: 'name', label: 'Produs', template: false },
			{ key: 'cantitate', label: 'Cantitate', template: true },
			{ key: 'actions', label: '', template: true }
		];

		this.tableDisplayedColumns = this.tableColumns.map((x) => x.key);
		this.tableDataSource = new MatTableDataSource(this.accesorii);
	}

  public deleteRow = (elem: any):void => {
    const index = this.tableDataSource.data.indexOf(elem.name);
    this.tableDataSource.data.splice(index, 1); //will delete latest row, should be added id
    this.createTable();
  }

  public onSelectChange = (event: MatSelectChange):void => {
    this.selectedOption = event.value;
    if(this.selectedOption.length > 0){
      this.hasValueSelected = true;
    }
  }

  public addValueToTable = ():void => {
    let data: Accesorii = { name: this.selectedOption, cantitate: 1};
    this.tableDataSource.data.push(data);  
    this.createTable();
  }

  // public changeQuantity (element: Accesorii): void {
  //   console.log(element)
  //   console.table(this.tableDataSource.data);
  // }
}
