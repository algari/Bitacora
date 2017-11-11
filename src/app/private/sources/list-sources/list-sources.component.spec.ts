import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSourcesComponent } from './list-sources.component';

describe('ListSourcesComponent', () => {
  let component: ListSourcesComponent;
  let fixture: ComponentFixture<ListSourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
