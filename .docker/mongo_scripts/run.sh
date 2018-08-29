#!/bin/bash
set -m

cmd="mongod"
if [ "$AUTH" == "yes" ]; then
    cmd="$cmd --auth"
fi

$cmd &

if [ ! -f /data/db/.mongodb_password_set ]; then
    /mongo_scripts/set_mongodb_password.sh
fi

fg
