#!/bin/bash

set -e

git fetch --all
echo "Checking out pages branch"
git checkout pages
git pull
echo "Rebasing pages branch on main"
git merge --no-ff main

echo "Building"
npm ci
npm run build
cp sabre-laser-match.html index.html
rm ./src/manifest.json
mv ./src/manifest_prod.json ./src/manifest.json
gitignore=$(grep -v .js ./.gitignore)
echo "$gitignore" > ./.gitignore
echo "Adding files and committing"
git add ./src/*.js index.html ./.gitignore ./src/manifest.json
git commit -m "Deploy $(date +'%Y-%m-%d')"
echo "Pushing to pages branch"
git push --force
echo "Checking out main branch"
git checkout main
echo "Done!"
