"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/articles/:id/increment-views",
      handler: "article.incrementViews",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
