import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAlertsComponent } from './change-alerts.component';

describe('ChangeAlertsComponent', () => {
  let component: ChangeAlertsComponent;
  let fixture: ComponentFixture<ChangeAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
