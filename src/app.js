import './assets/scss/app.scss';
import $ from 'cash-dom';


export class App {
  initializeApp() {

    $('.load-username').on('click', function (e) {
      const userName = $('#gh-username').val();

      fetch('https://api.github.com/users/' + userName)
        .then((response)=> {response.json})
        .then(function (body) {
          this.profile = body;
          this.update_profile();
        })

    })

  }

  update_profile() {
    $('#profile-name').text($('#gh-username').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }
}
