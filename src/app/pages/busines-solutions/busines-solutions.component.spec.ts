import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesSolutionsComponent } from './busines-solutions.component';

describe('BusinesSolutionsComponent', () => {
  let component: BusinesSolutionsComponent;
  let fixture: ComponentFixture<BusinesSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinesSolutionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
