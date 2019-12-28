import {Response, Request} from 'express';
import {escapeRegExp} from 'lodash';
import config from 'config';

const TITLE: string = 'Hobby Taste';

const staticURL = config.get('static.baseUrl');

function getHeader(): string {
  return (
      `
        <head>
            <meta charset="UTF-8">
            <link href="${staticURL}/favicon.ico" rel="icon">
            <meta name="viewport" content="width=768, initial-scale=1">
            <meta name="viewport" content="width=425, initial-scale=1">
            <meta name="viewport" content="width=375, initial-scale=1">
            <meta name="viewport" content="width=320, initial-scale=1">
            <title>${TITLE}</title>
            
            <script src="${staticURL}/main.js"></script>
        </head>
        `
  );
}

function getBody(): string {
  return (
      `
         <body>
            <div id="root"></div>
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

function getOptionalPath(path: string): RegExp {
    return new RegExp(`^\/${escapeRegExp(path)}\/?$`);
}

export function renderPage(path: string): [RegExp, (req: Request, res: Response) => void] {
    return [
        getOptionalPath(path),
        (req, res) => {
            res.end(getTemplate());
        }
    ];
}
