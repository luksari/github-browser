import { BaseEvent } from "./BaseEvent";

export class PullRequestEvent extends BaseEvent  {
  constructor(event) {
    super(event);
    this.event = event;
  }
  
  toDTO() {
    return ({
      id: this.event.id,
      type: this.event.type,
      userName: this.event.actor.login,
      userAvatarUrl: this.event.actor.avatar_url,
      profileUrl: this.event.actor.url,
      createdAt: new Date(this.event.created_at),
      metadata: {
        action: this.event.payload.action,
        repoName: this.event.repo.full_name || this.event.repo.name,
        repoUrl: this.event.repo.url,
        pullRequestUrl: this.event.payload.pull_request.url
      }
    })
  }
}
