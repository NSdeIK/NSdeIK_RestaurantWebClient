import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzemelyListaComponent } from './szemely-lista.component';

describe('SzemelyListaComponent', () => {
  let component: SzemelyListaComponent;
  let fixture: ComponentFixture<SzemelyListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SzemelyListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SzemelyListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
