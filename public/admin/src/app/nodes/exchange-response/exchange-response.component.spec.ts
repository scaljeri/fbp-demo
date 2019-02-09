import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeResponseComponent } from './exchange-response.component';

describe('ExchangeResponseComponent', () => {
  let component: ExchangeResponseComponent;
  let fixture: ComponentFixture<ExchangeResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
