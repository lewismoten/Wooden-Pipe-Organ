# Wooden Pipe Organ

This utility helps determine the dimensions for creating the wooden pipes of a portable organ for a laser cutter. Today `index.js` calculates and prints each pipe's dimensions; generating the SVG files is the goal.

These plans can also be adapted for larger cathedral organs, portable organs that can be carried and cranked by hand, as well as fairground organs mounted on trailers. However, my primary focus is on portable organs.

A portable organ is traditionally strapped to a person’s chest and played while moving through the streets. These organs were powered by a hand-cranked mechanism that pumped air into a reservoir connected to the pipes. A perforated roll or book of paper would then feed over a trackbar with holes, directing air to specific pipes. In some instances, the player might have had a trained monkey to collect coins from spectators.

This type of organ goes by many names:

- Street Organ
- Monkey Organ
- Grinder Organ
- Barrel Organ
- Hand Organ
- Crank Organ
- Portable Organ
- John Smith Organ - A gentlemen who sold plans to build hand organs.
- Busker Organ - A popular light-weight organ designed by John Smith.

Although the measurements are approximate, this utility takes into account factors that influence the speed of sound, such as temperature, altitude, and humidity. Temperature fluctuations throughout the day, as well as environmental changes like moving in and out of buildings, can also affect the speed of sound. Since the speed of sound impacts the wavelength for each frequency, pipes that work well in freezing temperatures may sound slightly out of tune on hot summer days.

## Run

```bash
node index.js
```

Edit the temperature, elevation, humidity, pipe type and note list at the top of `index.js` (the defaults are set for Front Royal, Virginia and a 20-note busker layout). It prints the speed of sound, then the frequency, wavelength, pipe size and toe hole for each note.
