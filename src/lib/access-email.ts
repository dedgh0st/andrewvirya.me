type AccessEmailContent = {
  html: string;
  text: string;
};

type AccessEmailOptions = {
  name: string;
  deckUrl: string;
  resumeUrl: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

export function buildAccessEmail({
  name,
  deckUrl,
  resumeUrl,
}: AccessEmailOptions): AccessEmailContent {
  const safeName = escapeHtml(name);
  const safeDeckUrl = escapeHtml(deckUrl);
  const safeResumeUrl = escapeHtml(resumeUrl);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light">
    <title>Your access links are ready</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f5;color:#18181b;font-family:Arial,Helvetica,sans-serif;color-scheme:light;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5;padding:36px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#ffffff;border:1px solid #e4e4e7;">
            <tr>
              <td style="height:5px;background-color:#b91c1c;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:36px 32px 32px;">
                <p style="margin:0 0 20px;color:#b91c1c;font-family:Courier New,monospace;font-size:12px;font-weight:bold;letter-spacing:1.5px;">SECURE DELIVERY&nbsp; / &nbsp;24H ACCESS</p>
                <h1 style="margin:0 0 16px;color:#18181b;font-size:28px;line-height:1.2;font-weight:700;">Your access links are ready.</h1>
                <p style="margin:0 0 28px;color:#52525b;font-size:16px;line-height:1.6;">Hi ${safeName}, your requested portfolio and resume links are below. They expire in 24 hours.</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e4e4e7;">
                  <tr>
                    <td style="padding:22px 0;border-bottom:1px solid #e4e4e7;">
                      <p style="margin:0 0 12px;color:#52525b;font-family:Courier New,monospace;font-size:12px;letter-spacing:1px;">01&nbsp; / &nbsp;PORTFOLIO DECK</p>
                      <a href="${safeDeckUrl}" style="display:inline-block;padding:12px 18px;background-color:#b91c1c;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;">Open portfolio deck</a>
                      <p style="margin:16px 0 5px;color:#71717a;font-size:12px;line-height:1.5;">Button not working? Open this link:</p>
                      <a href="${safeDeckUrl}" style="color:#b91c1c;font-size:12px;line-height:1.5;overflow-wrap:anywhere;word-break:break-all;">${safeDeckUrl}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:22px 0;border-bottom:1px solid #e4e4e7;">
                      <p style="margin:0 0 12px;color:#52525b;font-family:Courier New,monospace;font-size:12px;letter-spacing:1px;">02&nbsp; / &nbsp;RESUME</p>
                      <a href="${safeResumeUrl}" style="display:inline-block;padding:12px 18px;background-color:#b91c1c;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;">Open resume</a>
                      <p style="margin:16px 0 5px;color:#71717a;font-size:12px;line-height:1.5;">Button not working? Open this link:</p>
                      <a href="${safeResumeUrl}" style="color:#b91c1c;font-size:12px;line-height:1.5;overflow-wrap:anywhere;word-break:break-all;">${safeResumeUrl}</a>
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 0;color:#71717a;font-size:13px;line-height:1.6;">If you did not request these links, you can ignore this email.</p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;color:#71717a;font-family:Courier New,monospace;font-size:11px;letter-spacing:.5px;">ANDREW VIRYA&nbsp; / &nbsp;PORTFOLIO ACCESS</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `Hi ${name},`,
    "",
    "Your requested portfolio and resume links are below. They expire in 24 hours.",
    "",
    "01 / PORTFOLIO DECK",
    `Open portfolio deck: ${deckUrl}`,
    `If the button does not work, open this URL: ${deckUrl}`,
    "",
    "02 / RESUME",
    `Open resume: ${resumeUrl}`,
    `If the button does not work, open this URL: ${resumeUrl}`,
    "",
    "If you did not request these links, you can ignore this email.",
    "",
    "ANDREW VIRYA / PORTFOLIO ACCESS",
  ].join("\n");

  return { html, text };
}
