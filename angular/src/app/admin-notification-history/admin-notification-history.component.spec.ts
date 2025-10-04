import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotificationHistoryComponent } from './admin-notification-history.component';

describe('AdminNotificationHistoryComponent', () => {
  let component: AdminNotificationHistoryComponent;
  let fixture: ComponentFixture<AdminNotificationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNotificationHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNotificationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
