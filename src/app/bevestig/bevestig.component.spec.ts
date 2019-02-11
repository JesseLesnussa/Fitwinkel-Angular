import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BevestigComponent } from './bevestig.component';

describe('BevestigComponent', () => {
  let component: BevestigComponent;
  let fixture: ComponentFixture<BevestigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BevestigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BevestigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
