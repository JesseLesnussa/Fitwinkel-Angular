import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedewerkerDetailComponent } from './medewerker-detail.component';

describe('MedewerkerDetailComponent', () => {
  let component: MedewerkerDetailComponent;
  let fixture: ComponentFixture<MedewerkerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedewerkerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedewerkerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
