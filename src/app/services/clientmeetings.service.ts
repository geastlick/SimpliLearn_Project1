import { Injectable } from '@angular/core';
import {ClientMeeting} from "../interfaces/client-meeting";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientMeetingsService {
/*
  id: number;
  clientid: number;
  topic: string;
  attendees: number;
  starttime: Date;
 */
  private clientMeetings: ClientMeeting[] = [
    {id: 1, clientid: 2, topic: "Introductions", attendees: 7, starttime: new Date(2022,11,25, 12, 0, 0)},
  ];
  private lastId: number = 1;

  constructor() { }

  getClientMeetings(): Observable<ClientMeeting[]> {
    return new Observable<ClientMeeting[]>((subscriber) => {
      subscriber.next(this.clientMeetings);
    });
  }


  getClientMeeting(id: number): Observable<ClientMeeting> {
    const clientMeeting: ClientMeeting | undefined = this.clientMeetings.find(elem => elem.id === id);
    return new Observable<ClientMeeting>((subscriber) => {
      subscriber.next(clientMeeting == undefined ? {} as ClientMeeting : clientMeeting);
    });
  }

  upsertClientMeeting(clientMeeting: ClientMeeting): Observable<ClientMeeting> {
    if(clientMeeting.id != null) {
      const index: number = this.clientMeetings.findIndex(elem => elem.id === clientMeeting.id);
      if(index != null) {
        this.clientMeetings[index] = clientMeeting;
      } else {
        // shouldn't happen, but we will insert as new with provided id
        this.clientMeetings.push(clientMeeting);
      }
    } else {
      this.lastId++;
      clientMeeting.id = this.lastId;
      this.clientMeetings.push(clientMeeting);
    }
    return new Observable<ClientMeeting>((subscriber) => {
      subscriber.next(clientMeeting);
    });
  }

  removeClient(id: number): Observable<void> {
    const index: number = this.clientMeetings.findIndex(elem => elem.id === id);
    if(index != undefined) {
      this.clientMeetings.splice(index, 1);
    }
    return new Observable<void>(observer => observer.complete());
  }

}
