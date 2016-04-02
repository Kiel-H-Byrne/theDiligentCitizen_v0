#!/bin/bash

# This script shoudl be run in hudson by doing bash -ex stage.sh

echo "Doing a staging deployment"

# Run whatever tests we want (none for now).

# Things are good so far so make is so that the meteor user can read the files
echo "Make the workspace files accessible"
chmod -R 777 "$WORKSPACE"

# Kill any existing running meteor staging apps
echo "Kill meteor apps"
sudo -u meteor_stage -H bash -c "pkill -f '\/home\/meteor_stage\/\.meteor' -U meteor_stage || true"

# As the meteor user clean up and stage files
echo "Run as meteor user"
sudo -u meteor -H bash -c "rm -rf /home/meteor/prod; mkdir -p /home/meteor/prod_tmp; cp -R '$WORKSPACE' /home/meteor/prod_tmp; mv /home/meteor/prod_tmp/workspace /home/meteor/prod; rmdir /home/meteor/prod_tmp"

# Run the deployment 
echo "Spwaning meteor process..."
sudo -u meteor -H bash -c "cd /home/meteor/prod; /usr/local/bin/meteor --settings settings.json --release 1.2.1 --port 5000 >> /home/meteor/prod.log 2>&1 &" 

# Should be running on http://localhost:5000
#TODO Figure out a way to verify this!

