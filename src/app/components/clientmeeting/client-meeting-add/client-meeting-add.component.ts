import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDateStruct, NgbTimeAdapter, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {ClientMeeting} from "../../../interfaces/client-meeting";
import {ClientMeetingsService} from "../../../services/clientmeetings.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {OptionListItem} from "../../../interfaces/option-list-item";
import {Subscription} from "rxjs";
import {ClientsService} from "../../../services/clients.service";

@Component({
  selector: 'app-client-meeting-add',
  templateUrl: './client-meeting-add.component.html',
  styleUrls: ['./client-meeting-add.component.css']
})
export class ClientMeetingAddComponent implements OnInit, OnDestroy {

  @Input() clientMeeting: ClientMeeting = {} as ClientMeeting;

  clientOptions: OptionListItem[] = [];
  clientOptionSubscription: Subscription | null = null;

  date: NgbDateStruct = this.getToday();
  time: NgbTimeStruct = {hour: 0, minute: 0, second: 0};

  clientMeetingForm: FormGroup = new FormGroup('');

  constructor(private clientMeetingService: ClientMeetingsService, private clientService: ClientsService, public activeModal: NgbActiveModal, private calendar: NgbCalendar) { }

  ngOnInit(): void {
    if(this.clientMeeting.starttime) {
      this.date = {
        year: this.clientMeeting.starttime.getFullYear(),
        month: this.clientMeeting.starttime.getMonth() + 1,
        day: this.clientMeeting.starttime.getDate()
      };
      this.time = {
        hour: this.clientMeeting.starttime.getHours(),
        minute: this.clientMeeting.starttime.getMinutes(),
        second: this.clientMeeting.starttime.getSeconds()
      }
    }
    this.clientMeetingForm = new FormGroup({
      clientid: new FormControl(this.clientMeeting.clientid, Validators.required),
      topic: new FormControl(this.clientMeeting.topic, Validators.required),
      attendees: new FormControl(this.clientMeeting.attendees, Validators.required),
      dateControl: new FormControl(this.date),
      timeControl: new FormControl(this.time)
    })
    this.clientOptionSubscription = this.clientService.getClientOptions().subscribe((data: OptionListItem[]) => {
      this.clientOptions = data;
    });
  }

  ngOnDestroy() {
    if(this.clientOptionSubscription != null) {
      this.clientOptionSubscription.unsubscribe();
    }
  }

  getSelectedDate(): Date {
    let date = this.clientMeetingForm.controls['dateControl'].value;
    let time = this.clientMeetingForm.controls['timeControl'].value;
    let rtn = new Date(date.year, date.month - 1, date.day, time.hour, time.minute, time.second);
    return rtn;
  }

  onSubmit() {
    this.clientMeetingService.upsertClientMeeting({
      id: this.clientMeeting.id,
      clientid: this.clientMeetingForm.controls['clientid'].value,
      topic: this.clientMeetingForm.controls['topic'].value,
      attendees: this.clientMeetingForm.controls['attendees'].value,
      starttime: this.getSelectedDate()
    }).subscribe(data => console.log(data));
    this.activeModal.close();
  }

  getToday() {
    return this.calendar.getToday();
  }

  isInvalid(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched);
  }

}
