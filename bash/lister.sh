#!/bin/bash
cat $1 | tr "\n" "_" | head -c -1