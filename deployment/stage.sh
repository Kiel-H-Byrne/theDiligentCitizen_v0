#!/bin/bash

# This script shoudl be run in hudson by doing bash -ex stage.sh

echo "Doing a staging deployment"

# Run whatever tests we want (none for now).

# Things are good so far so make is so that the meteor user can read the files
echo "Make the workspace files accessible"
chmod -R 777 "$WORKSPACE"

# As the meteor user clean up and stage files
echo "Run as meteor user"
sudo -u meteor -H bash -c "rm -rf /home/meteor/staging; mkdir -p /home/meteor/staging_tmp; cp -R '$WORKSPACE' /home/meteor/staging_tmp; mv /home/meteor/staging_tmp/workspace /home/meteor/staging; rmdir /home/meteor/staging_tmp"

# Run the deployment 
echo "Spwaning meteor process..."
sudo -u meteor -H bash -c "cd /home/meteor/staging; /usr/local/bin/meteor --settings settings.json --release 1.2.1 --port 4000 >> /home/meteor/staging.log 2>&1 &" 

# Should be running on http://localhost:4000
#TODO Figure out a way to verify this!

