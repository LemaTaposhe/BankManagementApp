# BankMSAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.8.
## Project Structure

- **`src/app/`**: Contains the main application code.
  - **`components/`**: Directory for Angular components that define the UI and logic.
  - **`services/`**: Includes Angular services for handling API interactions and data management.
  - **`models/`**: Defines TypeScript interfaces and models for data structures.
  - **`app.module.ts`**: Root module that bootstraps the application.
  - **`app.component.ts`**: Main component of the application.
- **`BankMS_API/`**: Directory containing the API source code provided for the project.
- **`assets/`**: Static assets such as images and stylesheets.
- **`environments/`**: Configuration files for different environments (development, production).
## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js 18.20.4** (includes npm)
- **Angular CLI** (compatible with Angular 16.1.8) for managing Angular projects

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/LemaTaposhe/BankMS_Angular.git
   cd BankMS_Angular
 
2. **Install Dependencies**
   `npm install`
3. **Update API Configuration**
   
- Ensure the API endpoint in the service files is correctly set to match the API provided in the `BankMS_API` folder.

   
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
