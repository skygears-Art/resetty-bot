#!/bin/bash
source ./bash/list_checker
# check if there is a file with list in it
test -n "$1" && test -f $path && test -n "$(cat $path)" || exit 1
#give you how many elements are in that list
N=$(sed -n $= $path)
#this takes a item from a list or the last
name=$(basename $path)
ms="last item was taken from $name"

test -n "$(grep $2 $path)" &&
  sed -i /$2/d $path &&
  ms="$2 < was taken from < $name" ||
  sed -i /$(sed -n ${N}p $path)/d $path

echo $ms