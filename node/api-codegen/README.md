# Codegenerator 

Not a full fleged AI thingy, just parsing a json structure as follows [see](./sample-spec.json) feel free to experiment with this in different ways.

```json

{"paths":[
    {"route": "", "methods": ["get","post","delete"]}
    ]}
```

as shown the wireframe api defenition is expected a single propery "paths" which is an array of objects, each having properties route and methods, route is string and can have things like '/Bus', '/Bus/:id' etc and methods are http request methods which makes routers and controllers with method names related to the intentions as per the rest development practices. 

This was WIP for almost 2 years for nodejs, but migrated to typescript once I started developing deep into it. Future improvement options do have added to a wishlist  With the top priority to include a wrapper to handle openapi or swagger. I will tinker with these when time permits. 

To make this work, need to invoke from command line

```

node index.js -f <api wireframe json> -d <path to target dir> -n <project name should confirm that of nodejs standards> 

```

the "target-dir" if not exists will be created and few sub directories also, Once code is generated navigate to the "target dir" and these commands

```
npm install
npm run build
npm start

```

will kick up the base stub, whereas business logic needs to be written into the src/logic/<*>Controller.ts in the corresponding method handlers.