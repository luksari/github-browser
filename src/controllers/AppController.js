import { DataModel } from "../models/DataModel";
import { FormView } from "../views/FormView";
import { ProfileView } from "../views/ProfileView";
import { EventsView } from "../views/EventsView";
import { GithubApi } from "../api/GithubApi";

export class AppController {
  constructor() {
    this.model = new DataModel();
    this.formView = new FormView();
    this.profileView = new ProfileView();
    this.eventsView = new EventsView();

    this.formView.onFormSubmit(this.handleFormSubmit);

    this.model.bindProfileChanged(this.onProfileChanged);
    this.model.bindEventsChanged(this.onEventsChanged);
  }

  onProfileChanged = (profile) => {
    this.profileView.updateProfile(profile);
  }

  onEventsChanged = (events) => {
    this.eventsView.displayEvents(events);
  }

  handleFormSubmit = async (name) => {
    const profile = await this.fetchProfile(name);
    const events = await this.fetchEvents(name);
    this.model.updateProfile({ profile })
    this.model.updateEvents({ events });
  }

  fetchProfile = async (name) => {
    try {
      const data = await GithubApi.getUserProfile(name);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  fetchEvents = async (name) => {
    try {
      const data = await GithubApi.getUserEvents(name);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
