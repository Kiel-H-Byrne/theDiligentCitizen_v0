#!/bin/bash

# This script shoudl be run in hudson by doing bash -ex stage.sh

echo "Doing a staging deployment"

# Run whatever tests we want (none for now).

# Things are good so far so make is so that the meteor user can read the files
echo "Make the workspace files accessible"
chmod -R 777 "$WORKSPACE"

# Kill any existing running meteor staging apps
echo "Kill meteor staging apps"
pkill -f "/home/meteor_stage/.meteor" -U meteor_stage

# As the meteor user clean up and stage files
echo "Run as meteor user"
sudo -u meteor_stage -H bash -c "rm -rf /home/meteor_stage/staging; mkdir -p /home/meteor_stage/staging_tmp; cp -R '$WORKSPACE' /home/meteor_stage/staging_tmp; mv /home/meteor_stage/staging_tmp/workspace /home/meteor_stage/staging; rmdir /home/meteor_stage/staging_tmp"

# Run the deployment 
echo "Spwaning meteor process..."
sudo -u meteor_stage -H bash -c "cd /home/meteor_stage/staging; /usr/local/bin/meteor --settings settings.json --release 1.2.1 --port 4000 >> /home/meteor_stage/staging.log 2>&1 &" 

# Should be running on http://localhost:4000
#TODO Figure out a way to verify this!

