const inquirer = require('inquirer');

// const fs = require('fs');

// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err; 

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input', 
            name: 'name', 
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true; 
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true; 
                } else {
                    console.log('Please enter your GitHub Username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an about section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false; 
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {

    // if there's no 'projects' array property, create one 
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name', 
            message: 'What is the name of your project? (Required)',
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true; 
                } else {
                    console.log('Please enter the name of your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true; 
                } else {
                    console.log('Please enter a description of the project!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'JQuery', 'Bootstrap', 'Node']
        }, 
        {
            type: 'input', 
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: githubLinkInput => {
                if (githubLinkInput) {
                    return true; 
                } else {
                    console.log('Please enter the GitHub link to your project!');
                    return false;
                }
            }
        }, 
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        }, 
        {
            type: 'confirm', 
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])

    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });
    