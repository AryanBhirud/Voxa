# Voxa-Flow CLI

## Introduction
The voxa-flow CLI is a command-line interface designed to simplify various tasks related to project management and development environments. With a set of commands, users can initiate projects, make HTTP requests, manage stories and tasks, and perform various development-related activities.


## Setup

To set up voxa-flow, follow these steps:

1. Clone the repository to your local machine using `git clone https://github.com/AryanBhirud/voxa`
2. Run `npm init -y` to setup the project.
3. Install all dependancies using `npm install`
4. Create a `.env` file and add your database configurations.
5. Run SQL scripts to setup the following tables:
 * users
 * user_stories
 * comments
 * tasks
 * task_assignments
 * velocity-tracking
 * sprints
 * sprint-tasks
6. Run `npm i -g .` to install voxa-flow.
7. Run `voxa --help` for more information on the commands.



