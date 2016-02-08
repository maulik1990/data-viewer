# data-viewer
egen.io

## Table of Contents

  1. [Prerequisites](#prerequisites)
  2. [Installation](#installation)
  3. [Run](#run)
  
## Prerequisites

1\. Install [Node.js](http://nodejs.org). You should have the latest node and npm versions or you will get an npm error. 
    `>= npm 2.14.7, node 4.2.1`

2\. Install these NPM packages globally

```bash
npm install -g bower gulp
```

## Installation 
Run following commands in a terminal, install all the latest packages if asked for different versions.

```bash
npm install   
bower install
```

## Run

* `gulp` or `gulp build` to build an optimized version of ui-xp in `./dist` and `API_END_POINT` to `local` url
* `gulp build:test` to build an optimized version of ui-xp in `./dist` and `API_END_POINT` to `test` url
* `gulp build:prod` to build an optimized version of ui-xp in `./dist` and `API_END_POINT` to `prod` url
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp test` to launch your unit tests with Karma

## Features:
1. Uses configurable and modular `gulp` build system.
2. Uses `Font-Awesome` and `bootstrap glyphicons`.
3. Contains `.htaccess` file for `Apache` for `html5mode`.
4. Configurable `API_END_POINT` that can be switched among `local`, `test`, and `prod` environments.
5. 
