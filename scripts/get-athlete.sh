if [ -z $1 ]
then echo access token is required
exit 1
fi

access_token=$1
echo $(curl 'https://www.strava.com/api/v3/athlete' \
      -H "authorization: Bearer $access_token") | jq
      