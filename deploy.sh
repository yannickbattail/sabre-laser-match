#!/bin/bash

set -e

git fetch --all
echo "Checking out pages branch"
git checkout pages
git pull
echo "Rebasing pages branch on main"
git merge --ff-only main

echo "Building"
npm ci
npm run build
cp sabre-laser-match.html index.html
gitignore=$(grep -v .js ./.gitignore)
echo "$gitignore" > ./.gitignore
echo "Adding files and committing"
git add ./src/*.js index.html ./.gitignore
git commit -m "Deploy $(date +'%Y-%m-%d')"
echo "Pushing to pages branch"
git push --force
echo "Checking out main branch"
git checkout main
echo "Done!"
