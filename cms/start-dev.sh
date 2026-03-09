#!/bin/bash
export NODE_ENV=development
export NODE_OPTIONS=--no-deprecation
export __NEXT_PRIVATE_STANDALONE_CONFIG=
cd /Users/gongzhen/yt-downloader/cms
npx next dev -p 3089 2>&1
echo "=== CMS exited with code $? ==="
echo "Press enter to close..."
read
