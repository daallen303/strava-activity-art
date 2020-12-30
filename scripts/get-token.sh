#!/bin/bash

if [ -z $CLIENT_SECRET ]
then echo client_secret is required
exit 1
fi

if [ -z $1 ]
then echo code is required
exit 1
fi

code=$1


echo $(curl https://www.strava.com/oauth/token \
-d client_id="59033" \
-d client_secret=$CLIENT_SECRET \
-d code=$code \
-d grant_type="authorization_code") | jq
