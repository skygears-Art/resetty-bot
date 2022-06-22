#!/bin/bash
date=$(echo $1 | head -c 2)

ERROR () {
  echo "after"
  exit 0
}

test -n "$date" && test $date -le 23 && test $date -ge 0 || ERROR

echo ${date}:00 HS > ./schedule.sav

test $date -le 20 && date=$(expr $date + 4) || date=$(expr $date - 20)

echo "0 $date * * *" > ./timer.sav
echo time set at ${date}:00 UTC