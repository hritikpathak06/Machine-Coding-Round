export interface TaskData {
  Todo: string[];
  Completed: string[];
  InitalState: [];
}

export const initialData: TaskData = {
  Todo: [
    "Design the homepage",
    "Create the header component",
    "Build the login functionality",
    "Set up Redux for state management",
    "Integrate Google authentication",
    "Style the user profile page",
    "Write unit tests for components",
    "Optimize image loading times",
    "Implement form validation",
    "Configure API calls for the product list",
  ],
  InitalState: [],
  Completed: [
    "Set up the project structure",
    "Install necessary dependencies",
    "Configure Webpack and Babel",
    "Create basic layout",
    "Implement routing using React Router",
    "Set up the database schema",
    "Create initial product schema",
    "Configure environment variables",
    "Write API documentation",
    "Set up continuous integration (CI) pipeline",
  ],
};
