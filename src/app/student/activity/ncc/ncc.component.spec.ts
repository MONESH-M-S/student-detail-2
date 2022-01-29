import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NccComponent } from './ncc.component';

describe('NccComponent', () => {
  let component: NccComponent;
  let fixture: ComponentFixture<NccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
