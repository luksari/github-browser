import { DataModel } from "../models/DataModel";
import { FormView } from "../views/FormView";
import { ProfileView } from "../views/ProfileView";
import { EventsView } from "../views/EventsView";
import { GithubApi } from "../api/GithubApi";
import { LoadingStatus } from "../utils/LoadingStatus";
import { LoaderView } from "../views/LoaderView";

export class AppController {
  constructor() {
    this.model = new DataModel();
    this.formView = new FormView();
    this.profileView = new ProfileView();
    this.eventsView = new EventsView();
    this.loaderView = new LoaderView();
    
    this.formView.onFormSubmit(this.handleFormSubmit);
    
    this.model.bindProfileChanged(this.onProfileChanged);
    this.model.bindEventsChanged(this.onEventsChanged);

    this.loadingProfileStatus = LoadingStatus.Idle;
    this.loadingEventsStatus = LoadingStatus.Idle;
  }

  onProfileChanged = (profile) => {
    this.profileView.updateProfile(profile);
  }

  onEventsChanged = (events) => {
    this.eventsView.displayEvents(events);
  }

  handleDataLoading = () => {
    this.profileView.hideProfile();
    this.eventsView.hideEvents();
    this.loaderView.showLoader();
  }

  handleFormSubmit = async (name) => {
    this.handleDataLoading();
    const profile = await this.fetchProfile(name);
    const events = await this.fetchEvents(name);
    this.model.updateProfile({ profile })
    this.model.updateEvents({ events });
    this.loaderView.hideLoader();
  }

  fetchProfile = async (name) => {
    this.loadingProfileStatus = LoadingStatus.Pending;
    try {
      const data = await GithubApi.getUserProfile(name);
      this.loadingProfileStatus = LoadingStatus.Success;
      return data;
    } catch (error) {
      console.error(error);
      this.loadingProfileStatus = LoadingStatus.Error;
    }
  }

  fetchEvents = async (name) => {
    this.loadingEventsStatus = LoadingStatus.Pending;
    try {
      const data = await GithubApi.getUserEvents(name);
      this.loadingEventsStatus = LoadingStatus.Success;
      return data;
    } catch (error) {
      console.error(error);
      this.loadingEventsStatus = LoadingStatus.Error;
    }
  }
}
