# Warehouse Manager
### Steven Giang

### Project Overview

Warehouse Manager is an application designed to give a company the ability to manage its subsidiary companies, and any warehouses those subsidiary companies might own. We allow the user to add, edit, and delete companies, and provide the ability to load and manage their warehouse inventories.

### Project Link

* https://github.com/StevenSkillStorm/warehouse-inventory

### Installation, Run Locally

* Clone the repo
* Install npm dependencies using: **npm install**
* run: **npm start**
* open in browser: http://localhost:8088/

## Dependencies
Dependencies used include the following:
- Mongoose
- Express
- Bootstrap
- Bootstrap-icons
- cors
- dotenv
More information regarding the versions of these dependencies can be found in package.json

## File Descriptions
- index.js
The main script for Warehouse Manager. Deploys the application using express and manages routing. 

- controller/%
Controllers for communication with the database. The router usually redirects here to process CRUD requests.

- models/%
Define Mongoose Schemas for documents to use.

- public/scripts/%
JavaScript files for creating XMLHttpRequests and using the data from responses. Takes data received from the database and populates the HTML document. This file also integrates onclick calls to other functions.

- public/styles/%
CSS stylesheets for use with HTML pages. Warehouse Manager is currently a single-page application, so there's only one CSS file.

- public/views/%
HTML files. Currently only index.html.

- routes/api/%
Router files. Takes endpoints defined by HTTP CRUD methods and URI and redirects to other functions.