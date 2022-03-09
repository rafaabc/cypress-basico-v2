# cypress-basico-v2

Sample project for the basic course of the Talking About Testing online school.

## Pre-requirements

It is required to have Node.js and npm installed to run this project.

> I used versions `v14.17.3` and `6.14.13` of Node.js and npm, respectively. I suggest you use the same or later versions.

## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

You can run the tests simulating a desktop or mobile viewport.

### Desktop

Run `npm test` (or `npm t` for the short version) to run the test in headless mode on a desktop viewport.

Or, run `npm run cy:open` to open Cypress in interactive mode on a desktop viewport.

### Mobile

Run `npm run viewport:mobile-headless` to run the test in headless mode on a mobile viewport.

Or, run `npm run viewport:mobile` to open Cypress in interactive mode on a mobile viewport.
