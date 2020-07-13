import $ from 'cash-dom';

export class ProfileView {
  updateProfile(profile) {
   /** 
    * To be honest I should have thrown exception that would
    * map to message 'There is no user called {name}'
    * that is called async validation :)
    */
    if(!profile) {
      this._updateToMockedProfile();
      return;
    }

    $('#profile-name').text($('#gh-username').val())
    $('#profile-image').attr('src', profile.avatar_url)
    $('#profile-url').attr('href', profile.html_url).text(`@${profile.login}`)
    $('#profile-bio').text(profile.bio || '(No information)')
  }

  _updateToMockedProfile() {
    $('#profile-name').text('Random randy');
    $('#profile-url').attr('href', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ').text('@ClickHere');
    $('#profile-bio').text(`Para bailar la bamba
    Para bailar la bamba se necesita una poca de gracia
    Una poca de gracia pa' mi pa' ti y arriba y arriba
    Ah y arriba y arriba por ti seré, por ti seré, por ti seré`);
  }
}
