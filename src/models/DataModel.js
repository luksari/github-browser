export class DataModel {
  constructor() {
    this.profile = null;
  }

  updateProfile({ profile }) {
    this.profile = profile;
    this._commit(profile);
  }

  bindProfileChanged(callback) {
    this.onProfileChanged = callback
  }

  _commit(profile) {
    this.onProfileChanged(profile);
  }
}
