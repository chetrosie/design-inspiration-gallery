export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    const json = (data, status = 200) =>
      new Response(JSON.stringify(data), {
        status,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      });

    if (url.pathname === '/api/health') {
      return json({ ok: true, mode: 'cloudflare-full' });
    }

    if (url.pathname === '/api/inspirations' && request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT id, title, image_url, author, prompt, category, created_at FROM inspirations ORDER BY created_at DESC LIMIT 100'
      ).all();
      return json({ success: true, data: results ?? [] });
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

      return json({ success: true, id });
    }

    if (url.pathname === '/api/upload' && request.method === 'POST') {
      const form = await request.formData();
      const file = form.get('file');

      if (!file || typeof file === 'string') {
        return json({ success: false, error: 'file is required' }, 400);
      }

      const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
      const key = `uploads/${crypto.randomUUID()}.${ext}`;

      await env.ASSETS_BUCKET.put(key, file.stream(), {
        httpMetadata: {
          contentType: file.type || 'application/octet-stream',
        },
      });

      const publicUrl = `${url.origin}/media/${key}`;
      return json({ success: true, key, url: publicUrl });
    }

    if (url.pathname.startsWith('/media/')) {
      const key = url.pathname.replace('/media/', '');
      const object = await env.ASSETS_BUCKET.get(key);
      if (!object) return new Response('Not Found', { status: 404 });

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      headers.set('Access-Control-Allow-Origin', '*');

      return new Response(object.body, { headers });
    }

    return env.ASSETS.fetch(request);
  },
};
