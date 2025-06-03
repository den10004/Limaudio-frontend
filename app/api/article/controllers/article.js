module.exports = {
  async incrementViews(ctx) {
    try {
      const { id } = ctx.params;

      const article = await strapi.entityService.findOne(
        "api::article.article",
        id
      );

      if (!article) {
        return ctx.notFound("Article not found");
      }

      const updated = await strapi.entityService.update(
        "api::article.article",
        id,
        {
          data: {
            views: (article.views || 0) + 1,
          },
        }
      );

      return updated;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
