const TITLE: string = 'Hobby Taste';

function getHeader(): string {
  return (
      `
        <head>
            <meta charset="UTF-8">
            <link href="/public/images/favicon.ico" rel="icon">
            <meta name="viewport" content="width=768, initial-scale=1">
            <meta name="viewport" content="width=425, initial-scale=1">
            <meta name="viewport" content="width=375, initial-scale=1">
            <meta name="viewport" content="width=320, initial-scale=1">
            <title>${TITLE}</title>
        </head>
        `
  );
}

function getBody(): string {
  return (
      `
         <body>
            <div id="root"></div>
            <script src="/dist/main.js"></script>
          </body>
        `
  );
}

export function getTemplate() {
  return (
      `
        <!DOCTYPE html>
          <html lang="ru">
              ${getHeader()}
              ${getBody()}
          </html>
      `
  );
}
