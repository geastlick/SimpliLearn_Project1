import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMeetingAddComponent } from './client-meeting-add.component';

describe('ClientMeetingAddComponent', () => {
  let component: ClientMeetingAddComponent;
  let fixture: ComponentFixture<ClientMeetingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMeetingAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMeetingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
