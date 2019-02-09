import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeMergeComponent } from './exchange-merge.component';

describe('ExchangeMergeComponent', () => {
  let component: ExchangeMergeComponent;
  let fixture: ComponentFixture<ExchangeMergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeMergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
