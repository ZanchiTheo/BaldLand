import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgrademodalComponent } from './upgrademodal.component';

describe('UpgrademodalComponent', () => {
  let component: UpgrademodalComponent;
  let fixture: ComponentFixture<UpgrademodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgrademodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgrademodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
