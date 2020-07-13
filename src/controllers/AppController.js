import { DataModel } from "../models/DataModel";
import { FormView } from "../views/FormView";
import { ProfileView } from "../views/ProfileView";
import { GithubApi } from "../api/GithubApi";

export class AppController {
  constructor() {
    this.model = new DataModel();
    this.formView = new FormView();
    this.profileView = new ProfileView();

    this.formView.onFormSubmit(this.handleFormSubmit);

    this.model.bindProfileChanged(this.onProfileChanged);
  }

  onProfileChanged = (profile) => {
    this.profileView.updateProfile(profile);
  }

  handleFormSubmit = async (name) => {
    const profile = await this.fetchProfile(name);
    this.model.updateProfile({ profile })
  }

  fetchProfile = async (name) => {
    try {
      const data = await GithubApi.getUserProfile(name);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
