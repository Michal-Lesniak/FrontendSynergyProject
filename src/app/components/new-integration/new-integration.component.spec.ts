import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIntegrationComponent } from './new-integration.component';

describe('NewIntegrationComponent', () => {
  let component: NewIntegrationComponent;
  let fixture: ComponentFixture<NewIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewIntegrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
