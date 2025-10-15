# tsc "${1%/}"/index.ts
cd "${1%/}"
esbuild index.ts --bundle --minify --sourcemap --platform=node --target=es2020 --outfile=dist/index.js
# cd "${1%/}" && zip -r "../../lambdas-zipped/${1%/}.zip" index.js ../../node_modules/mysql2 ../../tsconfig.json
cd dist && zip -r "../../../lambdas-zipped/${1%/}.zip" index.js*
