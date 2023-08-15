const { build } = require("esbuild");
const yargs = require("yargs");

const argv = yargs(process.argv).argv;

const targets = [
    {
        entryPoints: ["./src/index.ts"],
        outfile: "./dist/index.js",
        target: "es2017",
    },
    {
        entryPoints: ["./src/versioncheck.ts"],
        outfile: "./dist/versioncheck.js",
        target: "node16",
        platform: "node",
    },
];

for (const options of targets) {
    build({
        bundle: true,
        logLevel: "info",
        watch: argv.watch,
        ...options,
    });
}
