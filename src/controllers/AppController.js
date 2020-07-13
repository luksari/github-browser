import { DataModel } from "../models/DataModel";
import { FormView } from "../views/FormView";
import { ProfileView } from "../views/ProfileView";

export class AppController {
  constructor() {
    this.model = new DataModel();
    this.formView = new FormView();
    this.profileView = new ProfileView();

    this.formView.onFormSubmit(this.handleFormSubmit);

    this.model.bindProfileChanged(this.onProfileChanged);
  }

  onProfileChanged =(profile) => {
    this.profileView.updateProfile(profile);
  }

  handleFormSubmit = async (name) => {
    const profile = await this.fetchProfile(name);
    this.model.updateProfile({ profile })
  }

  fetchProfile = async (name) => {
    try {
      const data = await fetch(`https://api.github.com/users/${name}`);
      return data.json();
    } catch (error) {
      console.error(error);
    }
  }
}
