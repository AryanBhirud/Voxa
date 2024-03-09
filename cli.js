#!/usr/bin/env cross-env node

import axios from "axios";
import { Command } from "commander";
import Configstore from "configstore";
import fs from "fs";
import inquirer from "inquirer";

const program = new Command();
const config = new Configstore("voxa");

program.version("1.0.0").description("A simple CLI application");

program
    .command("init")
    .description("Initialize the CLI by setting up configuration")
    .option("-y, --yes", "Skip interactive prompts")
    .action(async (options) => {
        let headers = [];

        if (!options.yes) {
            const answers = await inquirer.prompt([
                {
                    type: "input",
                    name: "baseUrl",
                    message: "Enter the base URL:",
                    default: "http://localhost:3000/api",
                },
                {
                    type: "confirm",
                    name: "customHeaders",
                    message: "Do you want to add custom headers?",
                    default: false,
                },
                {
                    when: (response) => response.customHeaders,
                    type: "input",
                    name: "header",
                    message: "Enter a custom header (key:value):",
                },
            ]);

            config.set("baseUrl", answers.baseUrl);

            if (answers.header) {
                headers.push(answers.header);
            }
        } else {
            config.set("baseUrl", "http://localhost:3000/api");
        }
        config.set("headers", headers);

        fs.writeFileSync("voxa.config", JSON.stringify(config.all, null, 2));

        console.log(
            "Initialization complete. Configuration saved to voxa.config."
        );
        process.exit(0);
    });

program
    .command("post <url> [data]")
    .description("Make a POST request to the specified URL")
    .action(async (route, data) => {
        const voxaConfig = JSON.parse(fs.readFileSync("voxa.config", "utf8"));
        const baseUrl = voxaConfig.baseUrl;
        const headers = voxaConfig.headers || {};
        const targetUrl = baseUrl + route

        try {
            const response = await axios.post(targetUrl, data, {
                headers,
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error:", error.message);
        }
    });

program
    .command("greet <name>")
    .description("Greet the user")
    .action((name) => {
        console.log(`Hello, ${name}!`);
        process.exit(0);
    });

program
    .command("get <route>")
    .description("Send an HTTP GET request")
    .option("-b, --baseUrl <baseUrl>", "Specify the base URL")
    .action(async (route, options) => {
        const storedConfig = JSON.parse(
            fs.readFileSync("voxa.config", "utf-8")
        );
        const baseUrl =
            options.baseUrl ||
            storedConfig.baseUrl ||
            "http://localhost:3000/api";
        const targetUrl = baseUrl + route;

        try {
            const response = await axios.get(targetUrl);
            console.log("HTTP Status:", response.status);
            console.log(response.data);

            process.exit(0);
        } catch (error) {
            console.error("Error:", error.message);

            if (error.response) {
                console.log("HTTP Status:", error.response.status);
                console.log("Response Data:", error.response.data);
            }

            process.exit(1);
        }
    });

program.parse(process.argv);
