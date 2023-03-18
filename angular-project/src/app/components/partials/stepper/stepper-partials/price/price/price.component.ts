import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Accesorii, Price, TableColumn } from 'src/app/models/models';
import { ContactDialogComponent } from './dialogs/contact-dialog/contact-dialog.component';
import { MailDialogComponent } from './dialogs/mail-dialog/mail-dialog.component';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit, OnChanges {

  @Output() btnProceedToPrice = new EventEmitter<any>();
  @Input() accesorii: any;

  public panelOpenState: boolean = true;
  public tableColumns: TableColumn[];
	public tableDisplayedColumns: string[];
  public tableDataSource: MatTableDataSource<Price>;
  public hasValueSelected: boolean = false;
  public selectedOption: string;

  public listaPreturi: any = [];

  constructor(private cdr: ChangeDetectorRef,                 
              public dialog: MatDialog,
    ){}

  ngOnInit(){}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    this.listaPreturi = changes['accesorii'].currentValue;
    this.listaPreturi && this.createTable();
  }

  private createTable(): void {
    const newPriceList = this.listaPreturi.map((listItem: any) => ({
      ...listItem,
      total: listItem.qty * listItem.price
    }));

		this.tableColumns = [
			{ key: 'label', label: 'Produs', template: false },
			{ key: 'qty', label: 'Cantitate', template: false },
      { key: 'price', label: 'Pret / u.m.', template: true },
      { key: 'total', label: 'Total', template: true }
		];

		this.tableDisplayedColumns = this.tableColumns.map((x) => x.key);
		this.tableDataSource = new MatTableDataSource(newPriceList);
	}

  public openContactDialog(): void{
    this.dialog.open(ContactDialogComponent, {
        data: null,
        width: "400px",
      });
  }

  public openMailDialog(): void{
    this.dialog.open(MailDialogComponent, {
        data: null,
        width: "400px",
      });
  }

  public redirectToComanda(){
    
  }
}
