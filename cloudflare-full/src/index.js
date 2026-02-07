export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return Response.json({ ok: true, mode: 'cloudflare-full' });
    }

    if (url.pathname === '/api/inspirations' && request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT id, title, image_url, author, prompt, category, created_at FROM inspirations ORDER BY created_at DESC LIMIT 100'
      ).all();
      return Response.json({ success: true, data: results ?? [] });
    }

    if (url.pathname === '/api/inspirations' && request.method === 'POST') {
      const body = await request.json();
      const id = crypto.randomUUID();
      await env.DB.prepare(
        `INSERT INTO inspirations (id, title, image_url, author, prompt, category, created_at)
         VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
      )
        .bind(
          id,
          body.title ?? 'Untitled',
          body.image_url ?? '',
          body.author ?? '',
          body.prompt ?? '',
          body.category ?? 'uncategorized'
        )
        .run();

      return Response.json({ success: true, id });
    }

    return env.ASSETS.fetch(request);
  },
};
