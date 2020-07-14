import { filterEvent, mapEvent } from "../domain/events/utils";
import { orderBy }from "lodash";

export class DataModel {
  constructor() {
    this.profile = null;
    this.events = [];
  }

  updateProfile({ profile }) {
    if (!profile.id) {
      this._commitProfile(null);
      return;
    }

    this.profile = profile;
    this._commitProfile(profile);
  }

  updateEvents({ events }) {
    if (!events.length) {
      this._commitEvents([]);
      return;
    }
  
    const mappedEvents = events
        .filter(filterEvent)
        .map(mapEvent)
        .map(event => event.toDTO())


    const sortedEvents =  orderBy(mappedEvents, ['createdAt'], ['desc']);
    this.events = sortedEvents;
    this._commitEvents(sortedEvents);
  }

  bindProfileChanged(callback) {
    this.onProfileChanged = callback
  }
  
  _commitProfile(profile) {
    this.onProfileChanged(profile);
  }

  bindEventsChanged(callback) {
    this.onEventsChanged = callback
  }

  _commitEvents(events) {
    this.onEventsChanged(events);
  }
}
