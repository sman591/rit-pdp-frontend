PDP-Front-end
=============

Front end for the RIT NTID DAS PDP website. Say that acronym 10 times fast.

# Getting Started

1. Install development requirements

  ```bash
  $ brew install npm
  $ npm install -g grunt grunt-cli
  ```

3. Clone the repo & install dependencies

  ```bash
  $ git clone git@github.com:sman591/rit-pdp-frontend.git
  $ cd rit-pdp-frontend
  $ bundle install
  $ npm install
  ```

4. Startup the local development environment

  ```bash
  grunt
  ```

5. Your local environment is now available at [http://localhost:4000](http://localhost:4000)

# Ongoing Development

Useful commands:

 - ```grunt``` - builds and starts a local server that watches for local changes
 - ```grunt build``` - performs a build, saved to /public
 - ```grunt gh-pages``` - deploy the current build to the gh-pages branch


# Deployment

Coming soon...
