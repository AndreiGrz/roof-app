import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Calculator1ApaComponent } from './components/calculator-1-apa/calculator-1-apa.component';
import { Calculator2ApeComponent } from './components/calculator-2-ape/calculator-2-ape.component';
import { Calculator4ApeComponent } from './components/calculator-4-ape/calculator-4-ape.component';
import { CalculatorPersonalizatComponent } from './components/calculator-personalizat/calculator-personalizat.component';
import { CalculManualComponent } from './components/calcul-manual/calcul-manual.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { SistemPluvialComponent } from './components/sistem-pluvial/sistem-pluvial.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    Calculator1ApaComponent,
    Calculator2ApeComponent,
    Calculator4ApeComponent,
    CalculatorPersonalizatComponent,
    CalculManualComponent,
    SistemPluvialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSlideToggleModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
