import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkenComponent } from './merken.component';

describe('MerkenComponent', () => {
  let component: MerkenComponent;
  let fixture: ComponentFixture<MerkenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerkenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerkenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
