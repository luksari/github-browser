import { PullRequestReviewCommentEvent } from "./PullRequestReviewCommentEvent";
import { PullRequestEvent } from "./PullRequestEvent";

const possibleEventTypes = ['PullRequestEvent', 'PullRequestReviewCommentEvent']; 

export const filterEvent = (event) => possibleEventTypes.includes(event.type);

const eventTypeMap = {
  'PullRequestEvent': PullRequestEvent,
  'PullRequestReviewCommentEvent': PullRequestReviewCommentEvent
}

export const mapEvent = (event) => new eventTypeMap[event.type](event);
