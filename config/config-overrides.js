// Sample on overriding without ejecting: https://jaketrent.com/post/change-webpack-config-create-react-app-without-ejecting/
const {
    override
} = require('customize-cra');
const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require('path');
const packageJson = require('../package.json');
const fs = require('fs');

const readEnvironmentVariables = () => {
    const basePath = path.resolve('.env');
    const envPath = basePath + '.' + process.env.ENV;
    const envPathExists = fs.existsSync(envPath);
    let envVars = {};

    if (envPathExists) {
        const fileEnv = dotenv.config({
            path: envPath,
        }).parsed;
        envVars = Object.assign({},
            envVars,
            Object.keys(fileEnv).reduce((prev, next) => {
                prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
                return prev;
            }, {})
        );
    }

    // common variables in .env.development or .env.production will be replaced by variables in .env
    // ADD GENERIC VARIABLES IN .env FILE.
    // ADD ENVIRONMENT SPECIFIC VARIABLES in both .env.development AND .env.production files.
    const baseEnv = dotenv.config({
        path: basePath,
    }).parsed;
    return Object.assign({},
        envVars,
        Object.keys(baseEnv).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(baseEnv[next]);
            return prev;
        }, {})
    );
};

const build = (() => {
    const timestamp = new Date().getTime();
    return {
        name: packageJson.name,
        version: packageJson.version,
        timestamp: timestamp,
        author: packageJson.author,
    };
})();

// override
module.exports = {
    webpack: override((config) => {
        config.plugins.push(
            new webpack.DefinePlugin(
                Object.assign({}, readEnvironmentVariables(), {
                    ENVIRONMENT: JSON.stringify({
                        build: build,
                    }),
                })
            )
        );
        return config;
    })    
};
