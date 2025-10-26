export const onRequestGet: PagesFunction<{ EMAILS: R2Bucket }> = async ({ env }) => {
  const obj = await env.EMAILS.get('gathered_emails.txt');
  const body = obj ? await obj.text() : '';
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};

