import { Calculator1ApaComponent } from './components/calculator-1-apa/calculator-1-apa.component';
import { Calculator2ApeComponent } from './components/calculator-2-ape/calculator-2-ape.component';
import { Calculator4ApeComponent } from './components/calculator-4-ape/calculator-4-ape.component';
import { CalculatorPersonalizatComponent } from './components/calculator-personalizat/calculator-personalizat.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { OfertaComponent } from './components/oferta/oferta.component';

const routes: Routes = [
  { path: '', redirectTo: '/calculator-1-apa', pathMatch: 'full' },
  { path: 'oferta/:tipCalculator/:id', component: OfertaComponent },
  { path: 'calculator-1-apa', component: Calculator1ApaComponent },
  { path: 'calculator-2-ape', component: Calculator2ApeComponent },
  { path: 'calculator-4-ape', component: Calculator4ApeComponent },
  { path: 'calculator-personalizat', component: CalculatorPersonalizatComponent }
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
