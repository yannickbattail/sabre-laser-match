#!/bin/bash

npm ci
npm run build
cp sabre-laser-match.html index.html
gitignore=$(grep -v .js ./.gitignore)
echo "$gitignore" > ./.gitignore
git add ./src/*.js index.html ./.gitignore
git commit -m "Deploy"
