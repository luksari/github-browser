import $ from 'cash-dom';
import { getEventTemplate } from './utils';

export class EventsView {

  displayEvents(events) {
    this._clearContainer();
    
    const html = this._buildHTML(events);
    if(html) {
      $('#user-timeline').removeClass('is-hidden').append(html);
    } 
  }

  hideEvents() {
    $('#user-timeline').addClass('is-hidden');
  }

  _buildHTML = (events) => {
    return events.reduce((htmlStr, curr) => {
      return htmlStr + this._renderEvent(curr);
    }, '');
  }

  _clearContainer() {
    $('#user-timeline').empty();
  }

  _renderEvent = (event) => {
    return getEventTemplate(event) 
  }
}
