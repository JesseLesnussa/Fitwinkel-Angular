import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlachtTableComponent } from './klacht-table.component';

describe('KlachtTableComponent', () => {
  let component: KlachtTableComponent;
  let fixture: ComponentFixture<KlachtTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlachtTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlachtTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
