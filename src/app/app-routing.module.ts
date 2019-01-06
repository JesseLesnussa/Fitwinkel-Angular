import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KlachtenComponent } from './klachten/klachten.component';
import { KlachtenDetailsComponent } from './klachten-details/klachten-details.component';
import { AddKlachtComponent } from './add-klacht/add-klacht.component';
import { KlantGegevensComponent } from './klant-gegevens/klant-gegevens.component';
import { MerkenComponent } from './merken/merken.component';
import { MedewerkersComponent } from './medewerkers/medewerkers.component';
import { MedewerkerDetailComponent } from './medewerker-detail/medewerker-detail.component';
import { ReportingComponent } from './reporting/reporting.component';

const routes: Routes = [
  {
    path: '',
    component: KlachtenComponent
  },
  {
    path: 'details/:id',
    component: KlachtenDetailsComponent
  },
  {
    path: 'toevoegen',
    component: AddKlachtComponent
  },
  {
    path: 'klanten',
    component: KlantGegevensComponent
  },
  {
    path: 'merken',
    component: MerkenComponent
  },
  {
    path: 'medewerkers',
    component: MedewerkersComponent
  },
  {
    path: 'medewerkers/:id',
    component: MedewerkerDetailComponent
  },
  {
    path: 'reporting',
    component: ReportingComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
