import { BaseEvent } from "./BaseEvent";

export class PullRequestReviewCommentEvent extends BaseEvent  {
  constructor(event) {
    super(event);
    this.event = event;
  }

  toDTO() {
    return ({
      id: this.event.id,
      type: this.event.type,
      userName: this.event.actor.login,
      userAvatarUrl: this.event.payload.pull_request.user.avatar_url,
      profileUrl: this.event.payload.pull_request.user.html_url,
      createdAt: new Date(this.event.created_at),
      metadata: {
        action: this.event.payload.action,
        commentUrl: this.event.payload.comment.html_url,
        pullRequestUrl: this.event.payload.pull_request.html_url,
        repoName: this.event.repo.full_name || this.event.repo.name,
        repoUrl: this.event.payload.pull_request.head.repo.html_url,
        pullRequestUrl: this.event.payload.pull_request.html_url
      }
    })
  }
}
