export async function GET() {
  return Response.json({ error: "This resource is no longer available." }, {
    status: 410,
    headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" },
  });
}
