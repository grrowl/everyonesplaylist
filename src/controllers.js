
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom';

// import Document from './views/document';
// import Index from './views/index';

import fs from 'fs';

// function renderDocument(children) {
  // return '<!DOCTYPE html>'+ render(<Document children={ Index } />);
  // return `<!DOCTYPE html> children;
// }

function renderView(filename) {
  return fs.readFileSync(filename, "utf8");
}

class Controllers {
  static index(req) {
    return {
      response: renderView('src/views/index.html'),
      code: 200
    }
  }

  static api(req) {
    return {
      response: 'hai',
      code: 200
    }
  }

  static apiSession(req) {
    return {
      response: 'hai',
      code: 200
    }
  }

  static apiPlaylist(req) {
    return {
      response: 'hai',
      code: 200
    }
  }

  static apiPlaylistCreate(req) {
    return {
      response: 'hai',
      code: 200
    }
  }
}

export default Controllers;
