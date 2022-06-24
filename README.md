# Resetty-bot
A discord bot for cleaning channels
this bot will take a list of channels and set them up to be scrubbed
of all their messages on a daily schedule

Use **--addthis** on a channel to the "channels list"
and use **--timer HOUR** to change your "reset schedule"

```
COMANDS

--addthis
Adds the current channel to the "channels list"

--removethis or --rmthis
Removes the current channel from the "channels list"

--timer (1-7)
Set how often your channels will be reset
example: "--timer 2" 
this will scrub your channels every 2 days

--schedule
Shows the channels and at what times they will be scrubbed

--template MESSAGE
Is the message that will be displayed" on a channel 
after being scrubbed

--resetnow or --scrubnow
Immediately scrubs all the message from the "channels list"

--cronset `CRON FORMAT`
This is a more complex alternative to the --timer command
use a format that is used to schedule timers on servers
for more info on the this command use "--cronhelp"

--cronhelp
Gives you information on how to use --cronset and cron format

--help
Gives you this guide
```
