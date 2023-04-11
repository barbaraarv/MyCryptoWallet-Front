import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCryptoDialogComponent } from './buy-crypto-dialog.component';

describe('BuyCryptoDialogComponent', () => {
  let component: BuyCryptoDialogComponent;
  let fixture: ComponentFixture<BuyCryptoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyCryptoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCryptoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
