import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableUserComponent } from './enable-user.component';

describe('EnableUserComponent', () => {
  let component: EnableUserComponent;
  let fixture: ComponentFixture<EnableUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnableUserComponent]
    });
    fixture = TestBed.createComponent(EnableUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
