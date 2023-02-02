import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Calculator1ApaComponent } from './components/calculator1apa/calculator1apa.component';
import { Calculator2ApeComponent } from './components/calculator2ape/calculator2ape.component';
import { Calculator4ApeComponent } from './components/calculator4ape/calculator4ape.component';
import { CalculatorPersonalizatComponent } from './components/calculatorpersonalizat/calculatorpersonalizat.component';
import { CalculManualComponent } from './components/calculmanual/calculmanual.component';
import { SistemPluvialComponent } from './components/sistempluvial/sistempluvial.component';

const routes: Routes = [
  {path: '', redirectTo: '/calculator_1apa', pathMatch: 'full'},
  { path: 'calculator_1apa', component: Calculator1ApaComponent },
  { path: 'calculator_2ape', component: Calculator2ApeComponent },
  { path: 'calculator_4ape', component: Calculator4ApeComponent },
  { path: 'calculator_personalizat', component: CalculatorPersonalizatComponent },
  { path: 'calcul_manual', component: CalculManualComponent },
  { path: 'sistem_pluvial', component: SistemPluvialComponent },
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
