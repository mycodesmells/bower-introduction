# Introduction to Bower

While creating an application, you most likely are going to depend on various external libraries. We've already seen how important it is to manage your package dependencies while working with Node JS project, but what about your front-end code? If you are working on, for example, Java web application and are using Java Script for your client code, you can use a solution like Webpack, but what if you want to keep your code really simple? Let's take a look on Bower, one of the cooler and simpler tool for managing your front-end dependencies.

Imagine you want to create a really simple application using, let's say jQuery and Bootstrap. As long as you are the only one developing it, it seems really easy - just download those two, include them into your index.html file and add your application-specific scripts. But what happens when you go public with your code? Once you share it with others, you need to take care of those libraries. Do you want to include them in your repository? It could work for some simple, one-file, rarely-changing code. But jQuery (especially jQuery-UI) can be quite large and often-changing, while Bootstap needs not only a JS file, but also CSS files, images, fonts etc. Another solution would be to have a Readme file describing what needs to be downloaded for your project to run. But what if the latest version of jQuery actually breaks your build? This would suck big time. Need more reasons to consider dependency management tool? I thought so.

### Starting with Bower

Bower is so simple, that it's hard to write too much about it. To start working with it, I usually install it as a global npm package, so it's available anywhere in my console:

	$ npm install -g bower
	...
	$ bower --version
	1.6.5

Now that we actually have bower available, we need to create a configuration file called `bower.json` (it's a natural equivalent of `package.json` for Node project). It asks a couple of questions about your project:

    $ bower init
    ? name bower-introduction
    ? description A simple example of Bower
    ? main file 
    ? what types of modules does this package expose? 
    ? keywords bower
    ? authors slomek <pslomka@pslomka.com>
    ? license MIT
    ? homepage 
    ? set currently installed components as dependencies? No
    ? add commonly ignored files to ignore list? No
    ? would you like to mark this package as private which prevents it from being accidentally published to the registry? Yes

After this little survey, we found a brand new configuration file in our project's root directory:

    {
      "name": "bower-introduction",
      "authors": [
        "slomek <pslomka@pslomka.com>"
      ],
      "description": "A simple example of Bower",
      "main": "",
      "moduleType": [],
      "keywords": [
        "bower"
      ],
      "license": "MIT",
      "homepage": "",
      "private": true
    }

Now we can define some dependencies. Let's stick with previously mentioned, jQuery and bootstrap:

     $ bower install --save jquery
     $ bower install --save bootstrap
     
After installing those, our `bower.json` file has an additional field:

    "dependencies": {
        "jquery": "~2.1.4",
        "bootstrap": "~3.3.5"
    }

Those two libraries have been installed into `bower_components` directory. If you look into their respective directories you will find configurations of their own, which, among other information, will inform you about the version of installed dependency:

    //bower_components/jquery/bower.json
    ...
      "version": "2.1.4",
    ...
    
    //bower_components/bootstrap/package.json
    ...
      "version": "3.3.5",
    ...

Now, let's delete our installed dependency and try to reinstall them basing on our bower configuration file:

    $ rm -r bower_components/
    $ bower install
    ...
    jquery#2.1.4 bower_components/jquery
    
    bootstrap#3.3.5 bower_components/bootstrap

As you can see, we found ourselves with the same versions installed - this way you can share your code without the need to attach your libraries directly in your source code.

### Dependencies destination directory

We still have one though. We have the dependencies installed in `bower_components` directory, which might not be very convenient for your project's structure. I prefer to have my dependencies stored in a directory called `vendor` (which informs me that it is provided from outside), maybe within some kind of `public` directory, so that the paths in the HTML file look good. How do you define the destination directory with Bower? We will need an additional configuration file for this, this time it's called .bowerrc:

    {
      "directory": "public/vendor/"
    }
    
After creating this file and running `bower install`, it creates `public/vendor` directory with the dependencies inside. Now you need to remmeber to delete the old `bower_components` directory and add `public/vendor` to your `.gitignore` file (or another ignore file, depending on your versioning system).

### End result

**main.css**:

    .buttons {
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
    
    #happiness-indicator {
        font-size: 10rem;
        display: none;
    }
    
**main.js**:
    
    $(document).ready(function(){
    
        $('.buttons .btn').click(function(){
            $('#happiness-indicator').show();
        });
    
        $('#likeBtn').click(function(){
            $('#happiness-indicator').addClass('glyphicon-thumbs-up');
            $('#happiness-indicator').removeClass('glyphicon-thumbs-down');
        });
    
        $('#hateBtn').click(function(){
            $('#happiness-indicator').addClass('glyphicon-thumbs-down');
            $('#happiness-indicator').removeClass('glyphicon-thumbs-up');
        });
    
    });
    
**index.html**:

    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Bower showcase with jQuery and Bootstrap</title>
        <link rel="stylesheet" href="vendor/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="main.css">
    
        <script src="vendor/jquery/dist/jquery.min.js"></script>
        <script src="main.js"></script>
    </head>
    <body>
    
    <div class="col-sm-8 col-sm-offset-2">
        <h2 class="page-header">Bower showcase with jQuery and Bootstrap</h2>
    
        <div class="buttons">
            <span id="likeBtn" class="btn btn-success">I like this</span>
            <span id="hateBtn" class="btn btn-danger">I hate this</span>
        </div>
    
        <div>
            <span id="happiness-indicator" class="glyphicon"></span>
        </div>
    </div>
    
    </body>
    </html>
    
Source code is also available on [GitHub](https://github.com/mycodesmells/bower-introduction)
    