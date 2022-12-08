import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsztalkezelesComponent } from './asztalkezeles.component';

describe('AsztalkezelesComponent', () => {
  let component: AsztalkezelesComponent;
  let fixture: ComponentFixture<AsztalkezelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsztalkezelesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsztalkezelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
