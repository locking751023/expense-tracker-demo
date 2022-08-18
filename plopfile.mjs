const plopJs = (plop) => {
  // create your generators here
  plop.setGenerator('component', {
    description: 'Create a Component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.js',
        templateFile: 'internal/plop-templates/Component.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.scss',
        templateFile: 'internal/plop-templates/Component.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.jsx',
        templateFile: 'internal/plop-templates/Component.jsx.hbs',
      },
    ], // array of actions
  });
};

export default plopJs;
