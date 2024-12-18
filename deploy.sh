#!/bin/bash

set -e


# Background
On_Black='\033[40m' On_Red='\033[41m' On_Green='\033[42m' On_Yellow='\033[43m' On_Blue='\033[44m' On_Purple='\033[45m' On_Cyan='\033[46m' On_White='\033[47m'
# High Intensity
IBlack='\033[0;90m' IRed='\033[0;91m' IGreen='\033[0;92m' IYellow='\033[0;93m' IBlue='\033[0;94m' IPurple='\033[0;95m' ICyan='\033[0;96m' IWhite='\033[0;97m'
# Bold High Intensity
BIBlack='\033[1;90m' BIRed='\033[1;91m' BIGreen='\033[1;92m' BIYellow='\033[1;93m' BIBlue='\033[1;94m' BIPurple='\033[1;95m' BICyan='\033[1;96m' BIWhite='\033[1;97m'
# High Intensity backgrounds
On_IBlack='\033[0;100m' On_IRed='\033[0;101m' On_IGreen='\033[0;102m' On_IYellow='\033[0;103m' On_IBlue='\033[0;104m' On_IPurple='\033[0;105m' On_ICyan='\033[0;106m' On_IWhite='\033[0;107m'
On_Reset='\e[0m'
#BRIGHT=$(tput bold) NORMAL=$(tput sgr0) BLINK=$(tput blink) REVERSE=$(tput smso) UNDERLINE=$(tput smul)

echo_log() {
    echo -ne "$ICyan"
    echo "$@"
    echo -ne "$On_Reset"
}

echo_info() {
    echo -ne "$IGreen"
    echo "$@"
    echo -ne "$On_Reset"
}

echo_warn() {
    echo -ne "$IPurple"
    echo "$@"
    echo -ne "$On_Reset"
}

echo_error() {
    echo -ne "$IRed" >&2
    echo "$@" >&2
    echo -ne "$On_Reset" >&2
    exit 1
}



git fetch --all
echo_info "Checking out pages branch"
git checkout pages
git pull
echo_info "Rebasing pages branch on main"
git merge --no-ff main

echo_info "Building"
npm ci
npm run build
cp sabre-laser-match.html index.html
git rm ./src/manifest.json
git mv ./src/manifest_prod.json ./src/manifest.json
gitignore=$(grep -v .js ./.gitignore)
echo "$gitignore" > ./.gitignore
echo_info "Adding files and committing"
git add ./src/*.js index.html ./.gitignore
git commit -m "Deploy $(date +'%Y-%m-%d')"
echo_info "Pushing to pages branch"
git push --force
echo_info "Checking out main branch"
git checkout main
echo_info "Done!"
