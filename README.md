# resetty-bot
a discord bot for cleaning channels
this bot will take a list of channels and set them up to be scrub
of all their message at a daly schedule

use **--addthis** on a channel to the "channels list"
and use **--timer HOUR** to change your "reset schedule"

```
COMANDS

--addthis
adds the current channel to the "channels list"

--removethis or --rmthis
removes the current channel from the "channels list"

--schedule
show you what channels and at what time
will be scrub

--timer HOUR(00-23)
set a what time you want your channels to be reset
you can only put numbers from 0 to 23 for example
"--timer 03" this will set the reset schedule to 3AM

--template MESSAGE
is the message that will be display on a channel 
after being scrub

--resetnow
inmedially scrubs all the message from the "channels list"

--cronset `CRON FORMAT`
this is a more complex alternative to the --timer command
use a format that is use to schedule timers on server
for more info on the this command use "--cronhelp"

--cronhelp
give you information on how to use --cronset and cron format

--help
give you this Guide
```
