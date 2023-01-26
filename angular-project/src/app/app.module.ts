import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { Calculator1ApaComponent } from './components/calculator1apa/calculator1apa.component';
import { Calculator2ApeComponent } from './components/calculator2ape/calculator2ape.component';
import { Calculator4ApeComponent } from './components/calculator4ape/calculator4ape.component';
import { CalculatorPersonalizatComponent } from './components/calculatorpersonalizat/calculatorpersonalizat.component';
import { CalculManualComponent } from './components/calculmanual/calculmanual.component';
import { SistemPluvialComponent } from './components/sistempluvial/sistempluvial.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    Calculator1ApaComponent,
    Calculator2ApeComponent,
    Calculator4ApeComponent,
    CalculatorPersonalizatComponent,
    CalculManualComponent,
    SistemPluvialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
