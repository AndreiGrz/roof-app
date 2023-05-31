import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Accesorii, Price, TableColumn } from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';
import { ContactDialogComponent } from './dialogs/contact-dialog/contact-dialog.component';
import { MailDialogComponent } from './dialogs/mail-dialog/mail-dialog.component';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit, OnChanges {
  @Output() btnProceedToPrice = new EventEmitter<any>();
  @Input() accesorii: any;
  @Input() models: any;
  @Input() measurements: any;
  @Input() tipCalculator: string;

  public panelOpenState: boolean = true;
  public tableColumns: TableColumn[];
  public tableDisplayedColumns: string[];
  public tableDataSource: MatTableDataSource<Price>;
  public hasValueSelected: boolean = false;
  public selectedOption: string;
  public listaPreturi: any = [];
  totalPrice = 0;

  constructor(private cdr: ChangeDetectorRef, public dialog: MatDialog, private mainService: MainService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.totalPrice = 0;
    this.listaPreturi = changes['accesorii']?.currentValue;
    this.listaPreturi && this.createTable();

    console.log(this.models, this.measurements, this.tipCalculator);
  }

  private createTable(): void {
    const newPriceList = this.listaPreturi.map((listItem: any) => ({
      ...listItem,
      total: listItem.qty * listItem.price,
    }));

    this.tableColumns = [
      { key: 'label', label: 'Produs', template: false },
      { key: 'qty', label: 'Cantitate', template: true },
      { key: 'price', label: 'Pret / u.m.', template: true },
      { key: 'total', label: 'Total', template: true },
    ];

    this.tableDisplayedColumns = this.tableColumns.map((x) => x.key);
    this.tableDataSource = new MatTableDataSource(newPriceList);
    newPriceList.map((item: any) => (this.totalPrice += item.total));
  }

  public openContactDialog(): void {
    this.dialog.open(ContactDialogComponent, {
      data: null,
      width: '400px',
    });
  }

  public openMailDialog(): void {
    this.dialog.open(MailDialogComponent, {
      data: {
        list: this.tableDataSource.data,
        models: this.models,
        measurements: this.measurements,
        tipCalculator: this.tipCalculator,
        //totalPrice: this.totalPrice,
      },
      width: '400px',
    });
  }

  comanda(): void {
    const products = this.tableDataSource.data.map((obj: any) => ({
      productId: obj.parentId === 0 ? obj.id : obj.parentId, 
      variationId: obj.parentId === 0 ? '' : obj.id,
      quantity: obj.qty
    }));
    const description = {...this.measurements, "tipCalculator": this.tipCalculator};
    const productParam = encodeURIComponent(JSON.stringify(products));
    const descriptionParam = encodeURIComponent(JSON.stringify(description));
    const url = `https://tabla-online.ro/calculator.php?products=${productParam}&description=${descriptionParam}`;

    window.location.href = url;
  }
}
