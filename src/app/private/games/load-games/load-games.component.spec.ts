import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadGamesComponent } from './load-games.component';

describe('LoadGamesComponent', () => {
  let component: LoadGamesComponent;
  let fixture: ComponentFixture<LoadGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
