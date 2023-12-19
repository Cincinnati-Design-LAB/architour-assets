# ArchiTour Assets

This project currently serves as a way to interact with assets through Stackbit for the ArchiTour application.

## Running Locally

Get started by installing dependencies:

    yarn install

### Environment Variables

Copy the `.envrc-sample` file to `.envrc` and load the values into the environment. Note: This is the approach because I use [direnv](https://direnv.net/). If you don't use direnv, you can just export the values in the `.envrc` file or use another tool.

Replace the variables with the appropriate values. If you don't have them, grab them from Stackbit.

### Generating a Token

The application is technically open to the public, so to make that difficult to abuse, we use a token to access the appropriate portion of the site and when uploading content.

Typically, when working locally, the `IMAGES_ACCESS_TOKEN` can be something like `images`. The `UPLOADER_SECRET_KEY` value can be anything. Or you can generate a secret.

    yarn generate-secret

### Running the Server

Then you can start the server

    yarn dev

The application runs on port `3001`.

## How it Works

This is really just a simple application for reading and writing image data. It's organized so that Stackbit can target a specific portion of the assets.

All content is available under `/<UPLOADER_SECRET_KEY>/<model>`. `model` is the name of the model in the ArchiTour project and can be either `tours` or `buildings`.

### Choosing Images

Note that this is meant to be loaded in an iframe and tightly integrated with Stackbit. Images can be deleted and added from this application. Choosing an image has specific client behavior for sending a `postMessage` to Stackbit, so that Stackbit can save the image data.

### Searching for Folders

To keep things tidy, each tour and building has its own directory. But that means a lot of Cloudinary folders. We're using Fuse.js as an initial attempt to make navigating the folders a bit easier.
