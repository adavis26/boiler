#!/usr/bin/env bash

echo "What would you like to name this project?"
read projectName

if ! [[ $projectName =~ ^([a-z][a-z0-9]*)(-[a-z0-9]+)*$ ]]; then
    echo "Project name is not kebab case. Ex new or new-great-app"
    exit 1
fi

echo $'renaming files...\n'
grep -rnw apps/* libs/* package.json nx.json -e 'boiler' | while read -r line; do
    file="$(echo $line | sed "s/:.*//")"
    echo "Modifying: $file"
    sed -i "s/boiler/$projectName/g" $file
done

echo "Renamed project to ${projectName}"

echo $'reinstalling npm packages...\n'
npm install

echo $'rebuilding api-interfaces lib...\n'
nx build api-interfaces

echo "done!"
