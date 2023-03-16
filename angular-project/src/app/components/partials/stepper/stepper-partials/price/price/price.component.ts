import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Accesorii, Price, TableColumn } from 'src/app/models/models';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent {

  @Output() btnProceedToPrice = new EventEmitter<any>();
   infoNecesarAccesorii: any;

  public panelOpenState: boolean = true;
  public tableColumns: TableColumn[];
	public tableDisplayedColumns: string[];
  public tableDataSource: MatTableDataSource<Price>;
  public hasValueSelected: boolean = false;
  public selectedOption: string;

  public listaPreturi: Price[] = [
    {name: 'Coama', cantitate: 1, pret: 20, total: 50},
    {name: 'Bordura metalica', cantitate: 4, pret: 20, total: 50},
    {name: 'Opritor din plastic', cantitate: 6, pret: 20, total: 50},
    {name: 'Holtsuruburi de alea bune', cantitate: 9, pret: 20, total: 50},
    {name: 'Set cos fum', cantitate: 10, pret: 20, total: 50},
    {name: 'Coama mica', cantitate: 12, pret: 20, total: 50},
    {name: 'Cost livrare', cantitate: 14, pret: 20, total: 50}
  ];

  constructor(private cdr: ChangeDetectorRef){}

  ngOnInit(){
    let x = this.infoNecesarAccesorii;
    this.createTable();
    // this.getInfoFromAccesorii();
  }

  getInfoFromAccesorii(event: any): void {
    this.infoNecesarAccesorii = event;
    this.cdr.detectChanges();

    console.log(this.infoNecesarAccesorii);
  }

  private createTable(): void {
		this.tableColumns = [
			{ key: 'name', label: 'Produs', template: false },
			{ key: 'cantitate', label: 'Cantitate', template: false },
      { key: 'pret', label: 'Pret / u.m.', template: false },
      { key: 'total', label: 'Total', template: false }
		];

		this.tableDisplayedColumns = this.tableColumns.map((x) => x.key);
		this.tableDataSource = new MatTableDataSource(this.listaPreturi);
	}
}
