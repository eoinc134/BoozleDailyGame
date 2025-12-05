const test = require("node:test");

module.exports = {
    testEnvironment: "node",
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    testPathIgnorePatterns: ["/node_modules/", "<rootDir>/dist/"]
}