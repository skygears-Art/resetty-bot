#!/bin/bash
source ./bash/list_checker
#check if an item was given else give error
test "undefined" = "$2" && exit 1
#puts the item on the list
test -z "$(cat $path | grep $2)" &&
  echo $2 >> $path &&
  echo "$2 > was added to >  $(basename $path)" ||
  echo THATS ALREADY AN ITEM ON THE LIST
