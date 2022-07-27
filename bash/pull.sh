#!/bin/bash
source ./bash/list_checker
# check if there is a file with list in it
test -f $path && test -n "$(grep $2 $path)" || exit 1
#this takes a item from a list or the last
name=$(basename $path)

sed -i /$2/d $path &&

echo "$2 < was taken from < $name"
