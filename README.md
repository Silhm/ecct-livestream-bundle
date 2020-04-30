# ecct-livestream-bundle
This is a [NodeCG](http://github.com/nodecg/nodecg) bundle for ECCT Livestream.

It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `^1.1.1`

You will need to have an appropriate version of NodeCG installed to use it.


## Howto install?

First you need to install [NodeCG](http://github.com/nodecg/nodecg) 
```
npm install --global nodecg-cli
mkdir nodecg
cd nodecg
nodecg setup
```

Check if it's running:

Run `node index.js` or `nodecg start` in the root nodecg folder.

Open the dashboard (http://localhost:9090 by default), you should see an empty dashboard.


## Howto install this bundle?

To use the precompiled bundle:

`nodecg install silhm/ecct-livestream-bundle`

or simply copy-paste *graphics* and *dashboard* folder in your bundle

To use this repository, in the nodecg/bundles directory:

`git clone https://github.com/Silhm/ecct-livestream-bundle.git && cd ecct-livestream-bundle`

Install dependencies

`npm install`

Create all the target in development mode

`npm run start`

Run in production

`npm run build`

