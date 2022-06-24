#!/bin/bash
date=$(echo $1 | head -c 2)

ERROR () {
  echo "after"
  exit 0
}

test -n "$date" && test $date -le 7 && test $date -ge 1 || ERROR

fl=
test "$date" = "1" && fl=1 && echo everyday > ./saves/schedule.sav ||
echo every ${date} days > ./saves/schedule.sav

intval="*"
test -z $fl && intval="*/${date}"

echo "0 7 $intval * *" > ./saves/timer.sav
echo scrub schedule set to happen every ${date} days
