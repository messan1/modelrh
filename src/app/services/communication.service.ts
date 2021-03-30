import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {


  private events: any = {};

  constructor() { }

  /**
   * Subscribes the instance of the assigned event name
   * @param eventName
   * Event name of the delegate
   */
  public On(eventName: PubSubEvents): Observable<any> {

      if (typeof this.events[eventName] === 'undefined') {
          this.events[eventName] = new Subject<any>();
      }

      return this.events[eventName].asObservable();
  }

  /**
   * Broadcast data to the specified event channel
   * @param eventName
   * Event name of the delegate
   * @param eventArgs
   * Arguments to pass through to the connected channel
   */
  public Broadcast(eventName: PubSubEvents, eventArgs: any) {
      if (!this.events[eventName]) {
          return;
      }

      this.events[eventName].next(eventArgs);
  }

}

//Your events
export declare type PubSubEvents =
  "OnChild1" | "OnChild2" | "OnChild3" | "OnChild4" | "OnChild5" | "OnChild6" | "OnChild7" | "OnChild8";

