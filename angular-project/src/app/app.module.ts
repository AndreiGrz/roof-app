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
import { NavtabsComponent } from './navigation/navtabs/navtabs.component';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { SharedModule } from './lib/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    Calculator1ApaComponent,
    Calculator2ApeComponent,
    Calculator4ApeComponent,
    CalculatorPersonalizatComponent,
    CalculManualComponent,
    SistemPluvialComponent,
    NavtabsComponent,
    ToolbarComponent,
    RouterModule,
    RouterLinkActive
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    AppRoutingModule,
    SharedModule,
    RouterModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
