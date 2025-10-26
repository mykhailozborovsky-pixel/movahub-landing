export const onRequestPost: PagesFunction<{ EMAILS: R2Bucket }> = async ({ request, env }) => {
  try {
    const { email } = await request.json().catch(() => ({}));
    const emailStr = String(email || '').trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
    if (!valid) return new Response(JSON.stringify({ ok:false, error:'Invalid email' }), { status:400 });

    const ip = request.headers.get('CF-Connecting-IP') || '';
    const line = `${new Date().toISOString()}\t${emailStr}\t${ip}\n`;
    const key = 'gathered_emails.txt';

    // 1) Читаємо існуючий вміст (якщо є)
    const existing = await env.EMAILS.get(key);
    const prev = existing ? await existing.text() : '';

    // 2) Дописуємо рядок і кладемо назад як text/plain
    await env.EMAILS.put(key, prev + line, {
      httpMetadata: { contentType: 'text/plain; charset=utf-8' }
    });

    return new Response(JSON.stringify({ ok:true }), { headers:{ 'content-type':'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ ok:false, error:'Server error' }), { status:500 });
  }
};
