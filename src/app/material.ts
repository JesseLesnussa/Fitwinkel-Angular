import {MatTableModule, MatProgressBarModule, MatButtonModule, MatCheckboxModule, MatListModule, MatDialogModule, MatAutocompleteModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatRippleModule, MatRadioModule, MatTooltipModule,
    MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule,MatMenuModule,MatIconModule,
    MatCardModule, MatGridListModule, MatDividerModule, MatChipsModule, MatToolbarModule, MatProgressSpinnerModule} from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [MatTableModule, MatProgressBarModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatListModule, MatDialogModule,MatRippleModule, MatRadioModule, MatTooltipModule,
        MatInputModule, MatSelectModule, MatSnackBarModule, MatDatepickerModule, MatExpansionModule, MatAutocompleteModule,MatMenuModule, MatIconModule,
        MatNativeDateModule, MatCardModule, MatGridListModule, MatDividerModule, MatChipsModule, MatToolbarModule, MatInputModule,MatProgressSpinnerModule],
    exports: [MatTableModule, MatProgressBarModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatListModule, MatDialogModule,MatRippleModule, MatRadioModule,MatTooltipModule,
        MatInputModule, MatSelectModule, MatSnackBarModule, MatDatepickerModule, MatExpansionModule, MatAutocompleteModule,MatMenuModule, MatIconModule,
        MatNativeDateModule, MatCardModule, MatGridListModule, MatDividerModule, MatChipsModule, MatToolbarModule, MatInputModule,MatProgressSpinnerModule],
    providers: [MatDatepickerModule ]
})

export class MaterialModule {}
