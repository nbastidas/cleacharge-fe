# EQB FrontEnd Portal #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* The code for EQB Portal v1.0.0

### How do I get set up? ###

## Installation

Install nvm (Find instructions for your OS of choice)

Instal the plugin to satisfy .editorconfig of your IDE or text editor of choice: [http://editorconfig.org/#download](http://editorconfig.org/#download)

Execute

    nvm install stable
    npm install -g gulp bower node-gyp

Go to the folder where you cloned the project i.e.:

    cd {workspace}/eqb-empl-fe-website

Execute

    npm install
    
Note: npm install have a post script command to execute bower install

## Deploying and Running

### `serve`

For the development phase, the command `gulp serve` launches a server which supports live reload of your modifications.

### `build`

The generator brings a state of the art optimization process with the command `gulp build` or simply `gulp`.

## Testing generated version

In order to test that there are no errors in the build version ready for production you can test it by running a simple http server from the dist folder. Here's how to do it:

Install simple-server globally

      npm install -g simple-server

Do a production build

      gulp build

Go to the dist folder underneath the root folder of the project i.e.:

      cd workspace/eqb-empl-fe-website/dist

Run the http server:

      http-server
