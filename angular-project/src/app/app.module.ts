import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Calculator1ApaComponent } from './components/calculator-1-apa/calculator-1-apa.component';
import { Calculator2ApeComponent } from './components/calculator-2-ape/calculator-2-ape.component';
import { Calculator4ApeComponent } from './components/calculator-4-ape/calculator-4-ape.component';
import { CalculatorPersonalizatComponent } from './components/calculator-personalizat/calculator-personalizat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RoofModelsComponent } from './components/partials/stepper/stepper-partials/roof-models/roof-models.component';
import { MeasurementsComponent } from './components/partials/stepper/stepper-partials/measurements/measurements.component';
import { StepperComponent } from './components/partials/stepper/stepper/stepper.component';
import { DimensiuniAcoperis1apaComponent } from './components/partials/stepper/stepper-partials/measurements-partials/dimensiuni-acoperis-1-apa/dimensiuni-acoperis1apa/dimensiuni-acoperis1apa.component';
import { DimensiuniAcoperis2apeComponent } from './components/partials/stepper/stepper-partials/measurements-partials/dimensiuni-acoperis-2-ape/dimensiuni-acoperis2ape/dimensiuni-acoperis2ape.component';
import { DimensiuniAcoperis4apeComponent } from './components/partials/stepper/stepper-partials/measurements-partials/dimensiuni-acoperis-4-ape/dimensiuni-acoperis4ape/dimensiuni-acoperis4ape.component';
import { ManualMeasurementsComponent } from './components/partials/stepper/stepper-partials/manual-measurements/manual-measurements/manual-measurements.component';
import { AccesoriiComponent } from './components/partials/stepper/stepper-partials/accesorii/accesorii/accesorii.component';
import { PriceComponent } from './components/partials/stepper/stepper-partials/price/price/price.component';
import { ContactDialogComponent } from './components/partials/stepper/stepper-partials/price/price/dialogs/contact-dialog/contact-dialog.component';
import { MailDialogComponent } from './components/partials/stepper/stepper-partials/price/price/dialogs/mail-dialog/mail-dialog.component';
import { ComandaComponent } from './components/partials/stepper/stepper-partials/comanda/comanda.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    Calculator1ApaComponent,
    Calculator2ApeComponent,
    Calculator4ApeComponent,
    CalculatorPersonalizatComponent,
    RoofModelsComponent,
    MeasurementsComponent,
    StepperComponent,
    DimensiuniAcoperis1apaComponent,
    DimensiuniAcoperis2apeComponent,
    DimensiuniAcoperis4apeComponent,
    ManualMeasurementsComponent,
    AccesoriiComponent,
    PriceComponent,
    ContactDialogComponent,
    MailDialogComponent,
    ComandaComponent,
    OfertaComponent
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
    HttpClientModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
