#!/bin/bash

# This script shoudl be run in hudson by doing bash -ex stage.sh

echo "Doing a staging deployment"

cp -R "$WORKSPACE" /tmp/stage
chown -R meteor:meteor /tmp/stage
sudo -u meteor -H bash -c "mv /tmp/stage /home/meteor/staging; cd /home/meteor/staging; /usr/local/bin/meteor meteor --settings settings.json --release 1.2.1 --port 4000" 

#Should be running on http://localhost:4000

