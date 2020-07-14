import $ from 'cash-dom';
import { isNotEmpty, isValidName } from '../utils/validators';

export class FormView {
  constructor() {
    this.userName = '';
    this.error = '';

    this.handleInputChange();
    /** Initialy validate input */
    this.validateInput();
  }

  setUsername(name) {
    this.userName = name;
  } 

  handleInputChange() {
    $('#gh-username').on('input', (e) => {
      this.setUsername(e.target.value);
      this.validateInput();
    });
  }

  onFormSubmit(handler) {
    $('#gh-form-button').on('click', async (e) => {
      e.preventDefault();
      await handler(this.userName);
      return false;
    })
  }
  
  validateInput() {
    if (!isNotEmpty(this.userName)) {
      this.error = 'The username should not be empty';
      this.showError();
    } else if (!isValidName(this.userName)) {
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
