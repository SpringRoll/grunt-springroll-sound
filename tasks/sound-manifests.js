/**
 * grunt-sound-manifests
 * Copyright (c) 2015 Matte Szklarz
 * Licensed under the MIT license.
 */
'use strict';
module.exports = function(grunt)
{
    var path = require('path');
    var taskDescription = 'Generates a config file for sound files in a springroll game.';
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('sound-manifests', taskDescription, function()
    {
        // Iterate over all specified file groups.
        this.files.forEach(function(f)
        {
            var folders = {};
            // Concat specified files.
            f.src.filter(function(filepath)
            {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath))
                {
                    grunt.log.warn('Source file \"' + filepath + '" not found.');
                    return false;
                }
                else
                {
                    return true;
                }
            }).map(function(filepath)
            {
                var folder = path.basename(path.dirname(filepath));
                if (!folders[folder])
                {
                    folders[folder] = [];
                }
                var fileName = path.basename(filepath, path.extname(filepath));
                folders[folder].push(fileName);
            }); //.join(grunt.util.normalizelf(options.separator));


            var output = {};
            for (var key in folders)
            {
                var dest = f.dest + key + '.json';
                var curr = grunt.file.read(dest);
                if (curr)
                {
                    var currSoundManifest = JSON.parse(curr).soundManifest;
                    for (var i = 0, len = currSoundManifest.length; i < len; i++)
                    {
                        // test for object
                        if (typeof currSoundManifest[i] == 'object')
                        {
                            console.log(currSoundManifest[i]);
                            var src = currSoundManifest[i].src ?
                                currSoundManifest[i].src :
                                currSoundManifest[i].id;
                            for (var j = 0, len = folders[key].length; j < len; j++)
                            {
                                var file = folders[key][j];
                                if (file === src)
                                {
                                    folders[key][j] = currSoundManifest[i];
                                }
                            }
                        }
                    }
                }

                output = {
                    context: key,
                    path: 'assets/sound/' + key + '/',
                    soundManifest: folders[key]
                }
                grunt.file.write(dest, JSON.stringify(output, null, '\t'));
                grunt.log.writeln('File \"' + dest + '\" created.');
            }
        });
    });
};