export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(null, { status: 302, headers: { Location: "/rust" } });
    }

    return env.ASSETS.fetch(request);
  },
};
