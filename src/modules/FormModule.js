import $ from 'cash-dom';

export class FormModule {
  initializeModule() {
    $('#gh-username').on('change', (e) => {
      console.log(e.target.value)
      this.validateForm(e.target.value);
    })
  }

  validateInput() {
    $('.')
  }
}
