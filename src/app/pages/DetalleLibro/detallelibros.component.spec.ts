import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLibrosComponent } from './detallelibros.component';

describe('DetalleLibrosComponent', () => {
  let component: DetalleLibrosComponent;
  let fixture: ComponentFixture<DetalleLibrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleLibrosComponent]
    });
    fixture = TestBed.createComponent(DetalleLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
