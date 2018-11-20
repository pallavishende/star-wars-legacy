import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DqfmodalComponent } from './dqfmodal.component';

describe('DqfmodalComponent', () => {
  let component: DqfmodalComponent;
  let fixture: ComponentFixture<DqfmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DqfmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqfmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
