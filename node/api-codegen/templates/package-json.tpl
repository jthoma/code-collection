{
  "name": "<name>",
  "version": "1.0.0",
  "description": "<desc>",
  "source-dir": "src",
  "main": "index.js",
  "scripts": {
    "dev": "ts-node-dev --poll src/index.ts",
    "build": "rimraf ./dist && tsc",
    "start": "npm run build && node dist/index.js",
    "lint": "node node_modules/eslint/bin/eslint.js src/ --ext .ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "joi": "^17.7.0",
    "jsonata": "^2.0.1",
    "lodash": "^4.17.21",
    "moment": "^2.29.4",
    "node-notifier": "^10.0.1"
  },
  "devDependencies": {
    "@babel/eslint-parser": "^7.21.3",
    "@swc/core": "^1.3.54",
    "@swc/wasm": "^1.3.54",
    "@types/axios": "^0.14.0",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/lodash": "^4.14.191",
    "@types/node": "^18.13.0",
    "eslint": "^8.36.0",
    "rimraf": "^4.1.2",
    "ts-node-dev": "^2.0.0",
    "typescript": "^4.9.5"
  }
}
