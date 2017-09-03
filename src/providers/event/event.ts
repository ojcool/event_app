import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventProvider {
  public userProfileRef:firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.userProfileRef = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }

  getEventList():firebase.database.Reference {
    return this.userProfileRef.child(`eventList`);
  }

  getEventDetail(eventId:string):firebase.database.Reference {
    return this.userProfileRef.child(`eventList/${eventId}`);
  }

  createEvent(eventName:string, eventDate:string, eventPrice:number, eventCost:number):
  firebase.Promise<any> {
    return this.userProfileRef.child(`eventList`).push({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1
    });
  }

  addGuest(guestName:string, eventId:string, eventPrice:number, guestPicture:string = null):
  firebase.Promise<any> {
    return this.userProfileRef.child(`eventList/${eventId}/guestList`).push({ guestName })
      .then( newGuest => {
        this.userProfileRef.child(`eventList/${eventId}`).transaction( event => {
          event.revenue += eventPrice;
          return event;
        });
        if(guestPicture != null){
          firebase.storage().ref(`/guestProfile/${newGuest.key}/profilePicture.png`)
            .putString(guestPicture, 'base64', {contentType: 'image/png'})
            .then( savedPicture => {
              this.userProfileRef
              .child(`eventList/${eventId}/guestList/${newGuest.key}/profilePicture`)
              .set(savedPicture.downloadURL);
            });
        }
      });
  }
}