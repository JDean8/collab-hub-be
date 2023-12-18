# Collab Hub Backend

This repository serves as the backend component for our application, `Collab Hub`. Its primary aim is to facilitate collaboration among programmers, enabling them to form teams and collectively develop various projects utilizing diverse skills.

This linked repository hosts a RESTful API accessed by our Web Application, developed using React and TypeScript (referenced below).

Link to the hosted version:

Link to the frontend repository:
`hhttps://github.com/Sir1ys/collab-hub-fe`

## FORK THIS REPOSITORY:

- In the top-right corner of the page, click ***fork***.
- Under "Owner" select the dropdown menu and click an owner for the forked repository.
- Click ***create fork***.

## CLONE YOUR FORK LOCALLY:

- On GitHub.com, navigate to your fork of the collab-hub-be.
- Above the list of files, click Code.
- Copy the URL for the repository.
- Open Terminal.
- Change the current working directory to the location where you want the cloned directory.
- Type git clone, and then paste the URL you copied earlier.
- Press Enter. Your local clone will be created.

## INSTALL DEPENDENCIES:

- after opening the repository in VS Code navigate to your terminal and run the following commands:
- npm install

## ADD THE FOLLOWING FILES AT THE TOP LEVEL OF THE MAIN FOLDER:

- .env.test with `PGDATABASE=ch_test` as the environment variable.

## SEED THE DATABASE:

- in your terminal run following commands:
- npm run setup-dbs
- npm run seed

## RUN THE TESTS:

- in your terminal run following commands:

* npm run test (to run all test files)

The minimum version of Node.js to run the project is >= 20.5.1
The minimum version of Postgres to run the project is >= 8.0
