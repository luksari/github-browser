import './assets/scss/app.scss';
import $ from 'cash-dom';
import { FormModule } from './modules/FormModule';


export class App {
  constructor() {
    this.userName = '';
    this.profile = null;
    this.formModule = new FormModule();
  }
  
  initializeApp() {
    this.initializeListeners();
    this.formModule.initializeModule();
  }

  initializeListeners() {
    $('.load-username').on('click', async (e) => {
      const userName = $('#gh-username').val();
      this.userName = userName;
      this.fetchData();
    })
  }

  async fetchData() {
    try {
      const res = fetch(`https://api.github.com/users/${this.userName}`);
      this.profile = res.json;
      this.updateProfile();
    } catch (error) {
      console.error(error);
    }
  }

  updateToMockedProfile() {
    $('#profile-name').text(this.userName);
    $('#profile-url').attr('href', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ').text('@ClickHere');
    $('#profile-bio').text(`Para bailar la bamba
    Para bailar la bamba se necesita una poca de gracia
    Una poca de gracia pa' mi pa' ti y arriba y arriba
    Ah y arriba y arriba por ti seré, por ti seré, por ti seré`);
  }
  
  /** 
   * To be honest I should have thrown exception that would
   * map to communicate 'There is no user called {name}'
   * that is called async validation
   */
  updateProfile() {
    if(!this.profile) {
      this.updateToMockedProfile();
      return;
    }

    $('#profile-name').text($('#gh-username').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }
}
