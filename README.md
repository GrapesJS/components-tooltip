# GrapesJS Tooltip


Simple, CSS only, tooltip component for GrapesJS



## Summary

* Plugin name: `grapesjs-tooltip`
* Components
  * `tooltip`
* Blocks
  * `tooltip`





## Options

|Option|Description|Default|
|-|-|-
|`option1`|Description option|`default value`|





## Download

* CDN
  * `https://unpkg.com/grapesjs-tooltip`
* NPM
  * `npm i grapesjs-tooltip`
* GIT
  * `git clone https://github.com/artf/grapesjs-tooltip.git`





## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-tooltip.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      // ...
      plugins: ['grapesjs-tooltip'],
      pluginsOpts: {
        'grapesjs-tooltip': { /* options */ }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import yourPluginName from 'grapesjs-tooltip';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [yourPluginName],
  pluginsOpts: {
    [yourPluginName]: { /* options */ }
  }
  // or
  plugins: [
    editor => yourPluginName(editor, { /* options */ }),
  ],
});
```





## Development

Clone the repository

```sh
$ git clone https://github.com/artf/grapesjs-tooltip.git
$ cd grapesjs-tooltip
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```





## License

BSD 3-Clause
