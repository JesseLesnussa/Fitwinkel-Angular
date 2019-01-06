import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlachtenDetailsComponent } from './klachten-details.component';

describe('KlachtenDetailsComponent', () => {
  let component: KlachtenDetailsComponent;
  let fixture: ComponentFixture<KlachtenDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlachtenDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlachtenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
