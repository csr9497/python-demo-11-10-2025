tsc "${1%/}"/index.ts
cd "${1%/}" && zip -r "../../lambdas-zipped/${1%/}.zip" index.js ../../node_modules/mysql2 ../../tsconfig.json