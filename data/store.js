function getPullData() {
  const result = require("../json/pulls.json");
  const structuredData = [];
  result.forEach((pullRequest) => {
    const repo = pullRequest.head.repo;
    const reviewData = getReviewDataForPull(pullRequest.url);

    const reviews = reviewData[0];

    if (reviews) {
      const reviewers = [];
      reviews.forEach((e) => reviewers.push(e.user.login));
      let status;
      if (pullRequest.merged_at == null) {
        status = pullRequest.state;
      } else {
        status = reviews[reviews.length - 1].state;
      }
      structuredData.push({
        id: pullRequest.id,
        owner: repo.owner.login,
        repo: repo.name,
        title: pullRequest.title,
        reviewers: reviewers,
        status: status,
        headBranch: pullRequest.head.ref,
        mergedAt: pullRequest.merged_at,
        createdAt: pullRequest.created_at,
      });
    } else {
      structuredData.push({
        id: pullRequest.id,

        owner: repo.owner.login,
        repo: repo.name,
        title: pullRequest.title,
        reviewers: null,
        status: pullRequest.state,
        headBranch: pullRequest.head.ref,
        mergedAt: pullRequest.merged_at,
        createdAt: pullRequest.created_at,
      });
    }
  });
  return structuredData;
}

function getReviewDataForPull(id) {
  const result = require("../json/reviews.json");
  const review = result.filter((e) => e[0]._links.pull_request.href === id);
  return review;
}

const data = getPullData();

module.exports = data;
