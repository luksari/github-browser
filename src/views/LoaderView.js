import $ from 'cash-dom';

export class LoaderView {
  showLoader() {
    $('#spinner').removeClass('is-hidden');
  }

  hideLoader() {
    $('#spinner').addClass('is-hidden');
  }
}
