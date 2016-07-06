# Setup
These steps are to get you setup for developing the Front-End assets for the site such as CSS and SVG Sprited Icons.

**Prerequisites:**
- [NodeJS](https://nodejs.org) Installed

**Steps:**

1. From the root of this repo, navigate to the "commands" directory.
    ```
    $ cd commands
    ```

2. We will need to make sure Gulp is installed globally on your machine. After that we can run our normal NPM install:
    ```
    $ npm install --global gulp
    $ npm install
    ```

3. Start your Gulp task runner to start watching your SCSS and SVG Icon files and do an initial compile.
    ```
    $ gulp
    ```
  > Gulp should start running in your terminal window and continuing running to watch any changes to your SCSS and SVG Icon files.

#SETUP
- 1) run `npm install`
- 2) run `gulp build`

## Unit Testing
We use Karma/Jasmine alongside AngularJS (angular-mocks) in order to unit test.
Razr has decided to put tests along side of there partner
component/service/directive/etc.

The Karma configuration file is in the commands directory. To run all tests:

`gulp test` which will run `karma start karma.conf.js` directly.

When developing with gulp watch or running gulp build, tests will also run - we
want to make sure our code is solid!


## Front-End Development Process
Once you have gone through the setup process, starting Gulp to watch for changes will be exactly like step 3 of the setup process. All you should have to do is run `gulp` in your terminal when you have navigated ot the "commands" directory.
  > To make CSS changes, please only edit the .scss files contained within the "scss" directory.
  
  > To make SVG Icon updates, you will need to add any new icon to the "images/icons" directory and it will be compiled into the sprite. You can always see the current icon list on the Style Guide."

##Note for base-member-web
needs symlink to base-member-web at the same level as usbank-member-web
Windows Example (run powershell as admin): cmd /c mklink C:\Users\your.user\code\usbank\base-member-web C:\Users\your.user\code\base-member-web
OSX Example (from terminal): sudo ln -s /Users/your.username/code/base-member-web /Users/your.username/code/usbank/base-member-web