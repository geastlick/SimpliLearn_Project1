import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMeetingListComponent } from './client-meeting-list.component';

describe('ClientMeetingListComponent', () => {
  let component: ClientMeetingListComponent;
  let fixture: ComponentFixture<ClientMeetingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMeetingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMeetingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
