import { format } from 'date-fns'

const PullRequestEventTemplate = (event) => `
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <p class="heading">${format(event.createdAt, 'MMM dd, yyyy')}</p>
      <div class="content">
        <span class="gh-username">
          <img class='gh-user-image' src="${event.userAvatarUrl}"/>
          <a href="${event.profileUrl}">${event.userName}</a>
        </span>
        ${event.metadata.action}
        <a href="${event.metadata.pullRequestUrl}">pull request</a>
        <p class="repo-name">
          <a href="${event.metadata.repoUrl}">${event.metadata.repoName}</a>
        </p>
      </div>
    </div>
  </div>
`

const PullRequestReviewCommentEventTemplate = (event) => `
  <div class="timeline-item is-primary">
    <div class="timeline-marker is-primary"></div>
    <div class="timeline-content">
      <p class="heading">${format(event.createdAt, 'MMM dd, yyyy')}</p>
      <div class="content">
        <span class="gh-username">
          <img class='gh-user-image' src="${event.userAvatarUrl}"/>
          <a href="${event.profileUrl}">${event.userName}</a>
        </span>
        created
        <a href="${event.metadata.commentUrl}">comment</a>
        to
        <a href="${event.metadata.pullRequestUrl}">pull request</a>
        <p class="repo-name">
          <a href="${event.metadata.repoUrl}">${event.metadata.repoName}</a>
        </p>
      </div>
    </div>
  </div>
`

const eventTemplateMap = {
  'PullRequestReviewCommentEvent': PullRequestReviewCommentEventTemplate,
  'PullRequestEvent': PullRequestEventTemplate
}

export const getEventTemplate = (event) => {
  return eventTemplateMap[event.type](event);
}

