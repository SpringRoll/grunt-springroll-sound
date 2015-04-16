# grunt-sound-manifests [![Build Status](https://travis-ci.org/SpringRoll/grunt-springroll-sound.svg)](https://travis-ci.org/SpringRoll/grunt-springroll-sound) [![Dependency Status](https://david-dm.org/SpringRoll/grunt-springroll-sound.svg)](https://david-dm.org/SpringRoll/grunt-springroll-sound)

Generates a sounds manifest config file for use in a Springroll game/application.

## Getting Started
This plugin requires Grunt `~0.4.5` and is designed for use with the Springroll sound playback. 

```shell
npm install grunt-sound-manifests --save-dev
```
```js
grunt.loadNpmTasks('grunt-sound-manifests');
```

## The "sound_manifests" task

### Overview
In your project's Gruntfile, add a section named `soundManifests` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sound_manifests: {
    inputPath: "deploy/assets/sounds",
    outputPath: "src/%namespace%/config"
  },
});
```

### Options

#### options.inputPath
Type: `String`
Default value: `"deploy/assets/sounds"`

A string value of the relative path to the sounds folders (music/, sfx/, and vo/).

#### options.outputPath
Type: `String`
Default value: `src/%namespace%/config`

A string value of the relative path to the config folder for the project.

### Usage Examples

#### Default Options
After placing or renaming sound files in the `deploy/assets/sounds/<music/,sfx/,vo/>` folders, run `grunt sound-manifest` to build new  `src/%namespace%/config/sounds/<music/,sfx/,vo/>` files. 

_Note:_ The process is a complete re-write, however, it _will_ check-for and copy objects that have the same `id` or `src` in the current config files. If a file is renamed at the src (e.g. in Finder) and the process is run, it will lose the object's data (unless you had already set the `id` to be the new name). 

## Release History
_(Nothing yet)_
