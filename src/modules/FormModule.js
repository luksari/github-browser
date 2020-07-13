import $ from 'cash-dom';
import { isNotEmpty, isValidName } from '../utils/validators';

export class FormModule {
  constructor() {
    this.error = '';
    this.name = '';
  }

  initializeModule() {
    this.initializeListeners();
  }

  initializeListeners() {
    $('#gh-username').on('input', (e) => {
      this.name = e.target.value;
      this.validateInput();
    });
    $('#gh-form').on('submit', (e) => {
      console.log(e);
      e.preventDefault();
      this.validateInput();
    })
  }

  validateInput() {
    if (!isNotEmpty(this.name)) {
      this.error = 'The username should not be empty';
      this.showError();
    } else if (!isValidName(this.name)) {
      /** Sorry didn't have idea for better message */
      this.error = `The username should contain only characters 'a-z', '0-9', '-', '_'`;
      this.showError();
    } else {
      this.error = '';
      this.hideError();
    }
  }

  showError() {
    $('#gh-username').addClass('is-danger');
    $('#gh-form-button').attr('disabled', true);
    $('#gh-form-error').text(this.error);

  }

  hideError() {
    $('#gh-username').removeClass('is-danger');
    $('#gh-form-button').removeAttr('disabled');
    $('#gh-form-error').text(this.error);
  }
}
