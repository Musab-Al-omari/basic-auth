# basic-auth

├── .gitignore
├── .eslintrc.json
├── __tests__
│   ├── auth.router.test.js
│   ├── basic-auth.test.js
│   ├── bearer-auth.test.js
│   ├── 500.test.js
│   ├── model-finder.test.js
│   ├── mongo.js
├── src
│   ├── auth
│   │   ├── router.js
│   │   ├── middleware
│   │   │   ├── basic.js
│   │   │   ├── bearer.js
│   │   │   ├── oauth.js
│   │   ├── models
│   │   │   ├── users-model.js
│   ├── middleware
│   │   ├── 404.js
│   │   ├── 500.js
│   │   ├── model-finder.js
│   ├── server.js
├── index.js
└── package.json