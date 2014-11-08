#!/bin/sh
rm nohup.out
PID=`ps -ef | grep "node server.js" | head -n 1 |  cut -d' ' -f4`
if [ -z "$PID" ]; then 
PID=`ps -ef | grep "node server.js" | head -n 1 |  cut -d' ' -f5`
fi
if [ -z "$PID" ]; then 
PID=`ps -ef | grep "node server.js" | head -n 1 |  cut -d' ' -f6`
fi
echo $PID
kill -9 $PID
PID=`ps -ef | grep "app.js" | head -n 1 | cut -d' ' -f4`
if [ -z "$PID" ]; then 
PID=`ps -ef | grep "app.js" | head -n 1 | cut -d' ' -f5`
fi
if [ -z "$PID" ]; then 
PID=`ps -ef | grep "app.js" | head -n 1 | cut -d' ' -f6`
fi
echo $PID
kill -9 $PID
