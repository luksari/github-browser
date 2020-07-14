export class BaseEvent {
  constructor(event) {
    this.event = event;
  }

  toDTO() {
    return ({
      id: this.event.id,
      type: this.event.type,
      userName: this.event.actor.login,
      userAvatarUrl: this.event.payload.user.avatar_url,
      profileUrl: this.event.payload.user.html_url,
      createdAt: new Date(this.event.created_at),
      metadata: {}
    })
  }
}
