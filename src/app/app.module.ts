import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectKlantComponent } from './select-klant/select-klant.component';
import { GegevensKlantComponent } from './gegevens-klant/gegevens-klant.component';
import { HeaderComponent } from './header/header.component';
import { MsSQLService } from './ms-sql.service'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { KlachtenComponent } from './klachten/klachten.component';
import { KlachtenDetailsComponent } from './klachten-details/klachten-details.component';
import { AddKlachtComponent } from './add-klacht/add-klacht.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { KlantGegevensComponent } from './klant-gegevens/klant-gegevens.component';
import { MomentModule } from 'angular2-moment/moment.module';
import { MerkenComponent } from './merken/merken.component';
import { MedewerkersComponent } from './medewerkers/medewerkers.component';
import { ReportingComponent } from './reporting/reporting.component';
import { MedewerkerDetailComponent } from './medewerker-detail/medewerker-detail.component';
import { KlachtTableComponent } from './klacht-table/klacht-table.component';
import { AddActieComponent } from './add-actie/add-actie.component';
import { KlachtVervolgComponent } from './klacht-vervolg/klacht-vervolg.component';
import { BevestigComponent } from './bevestig/bevestig.component';
import { EditMerkComponent } from './edit-merk/edit-merk.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectKlantComponent,
    GegevensKlantComponent,
    HeaderComponent,
    KlachtenComponent,
    KlachtenDetailsComponent,
    AddKlachtComponent,
    KlantGegevensComponent,
    MerkenComponent,
    MedewerkersComponent,
    ReportingComponent,
    MedewerkerDetailComponent,
    KlachtTableComponent,
    AddActieComponent,
    KlachtVervolgComponent,
    BevestigComponent,
    EditMerkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule
  ],
  entryComponents: [EditMerkComponent, BevestigComponent, KlachtTableComponent,AddKlachtComponent, AddActieComponent, KlachtVervolgComponent],
  providers: [MsSQLService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
