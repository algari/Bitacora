import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStrategyComponent } from './new-strategy.component';

describe('NewStrategyComponent', () => {
  let component: NewStrategyComponent;
  let fixture: ComponentFixture<NewStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
