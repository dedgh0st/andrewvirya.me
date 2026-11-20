export function GET() {
  return new Response(
    '<!doctype html><html lang="en"><body><p>[!] NICE RECON. YOU FOUND THE HIDDEN ENDPOINT</p><p>flag{r3c0n_1s_h4lf_th3_b4ttl3}</p><a href="/">Home</a></body></html>',
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    },
  );
}
