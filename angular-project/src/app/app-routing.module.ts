import { Calculator1ApaComponent } from './components/calculator-1-apa/calculator-1-apa.component';
import { Calculator2ApeComponent } from './components/calculator-2-ape/calculator-2-ape.component';
import { Calculator4ApeComponent } from './components/calculator-4-ape/calculator-4-ape.component';
import { CalculatorPersonalizatComponent } from './components/calculator-personalizat/calculator-personalizat.component';
import { CalculManualComponent } from './components/calcul-manual/calcul-manual.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SistemPluvialComponent } from './components/sistem-pluvial/sistem-pluvial.component';

const routes: Routes = [
  { path: '', redirectTo: '/calculator-1-apa', pathMatch: 'full' },
  { path: 'calculator-1-apa', component: Calculator1ApaComponent },
  { path: 'calculator-2-ape', component: Calculator2ApeComponent },
  { path: 'calculator-4-ape', component: Calculator4ApeComponent },
  { path: 'calculator-personalizat', component: CalculatorPersonalizatComponent },
  { path: 'calcul-manual', component: CalculManualComponent },
  { path: 'sistem-pluvial', component: SistemPluvialComponent },
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
