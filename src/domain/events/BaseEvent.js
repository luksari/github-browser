export class BaseEvent {
  constructor(event) {
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
      metadata: {}
    })
  }
}
