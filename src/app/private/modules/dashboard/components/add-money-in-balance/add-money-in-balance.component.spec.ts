import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyInBalanceComponent } from './add-money-in-balance.component';

describe('AddMoneyInBalanceComponent', () => {
  let component: AddMoneyInBalanceComponent;
  let fixture: ComponentFixture<AddMoneyInBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoneyInBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoneyInBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
