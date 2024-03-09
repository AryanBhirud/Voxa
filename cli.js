#!/usr/bin/env cross-env node

import { Command } from 'commander';

const program = new Command();

program
    .version('1.0.0')
    .description('A simple CLI application');

program
    .command('greet <name>')
    .description('Greet the user')
    .action((name) => {
        console.log(`Hello, ${name}!`);
        process.exit(0);
    });

program.parse(process.argv);
