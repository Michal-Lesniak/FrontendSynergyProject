import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayIntegrationComponent } from './display-integration.component';

describe('DisplayIntegrationComponent', () => {
  let component: DisplayIntegrationComponent;
  let fixture: ComponentFixture<DisplayIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayIntegrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
