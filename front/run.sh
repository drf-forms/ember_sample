#!/bin/bash

npm install
if [ -f dist/manifest.appcache ]; then
  rm dist/manifest.appcache
fi
ember serve --proxy http://127.0.0.1:8000
