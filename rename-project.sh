#!/usr/bin/env bash
appName=$1

if [[ -z $appName ]]; then
    echo "No project name! Please specify project name."
    exit 1
fi

grep -rnw --exclude-dir={node_modules,.angular,dist} . -e 'boiler' | while read -r line; do
    file="$(echo $line | sed "s/:.*//")"
    echo "Modifying: $file"
    sed 's/boiler/app-name/' $file
done
