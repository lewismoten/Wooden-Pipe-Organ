
function midiToNoteNumber(midiNumber) {
  if (midiNumber < 0 || midiNumber > 127) return -1;
  return midiNumber % 12;
}
function midiToOctave(midiNumber) {
  if (midiNumber < 0 || midiNumber > 127) return -1;
  return Math.floor(midiNumber / 12) - 1;
}
function midiToNoteName(midiNumber) {
  const number = midiToNoteNumber(midiNumber);
  if (number === -1) return "";
  const noteNames = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  const note = noteNames[number];
  const octave = midiToOctave(midiNumber);
  return `${note}${octave}`;
}
const midiToFrequency = (midiNumber) => {
  if (midiNumber < 0 || midiNumber > 127) return -1;
  const A4 = 440;
  return A4 * Math.pow(2, (midiNumber - 69) / 12);
}
function calcSpeedOfSound(temperature, elevation = 0, humidity = 0) {
  const baseSpeed = 331.3;  // 0°C dry air
  const tempCoefficient = 0.606;
  const humidityCoefficient = 0.0124;
  let speedOfSound = baseSpeed + (tempCoefficient * temperature) + (humidityCoefficient * humidity);
  if (elevation > 0) {
    const kelvin = celsiusToKelvin(temperature);
    const pressureFactor = Math.pow((1 - (0.0065 * elevation) / kelvin), 5.257);
    speedOfSound *= pressureFactor;
  }
  return speedOfSound;
}
const calcWaveLength = (frequency, speedOfSound = 343) => {
  if (frequency <= 0) return -1;
  return speedOfSound / frequency;
}
function calcPipeLength(wavelength, isOpen = false) {
  if (wavelength <= 0) return -1;
  return wavelength / (isOpen ? 2 : 4);
}
function calcPipeDiameter(wavelength, isOpen = false) {
  return calcPipeLength(wavelength, isOpen) / 10;
}
function calcToeHole(wavelength, airPressureInches, minWaveLength, maxWaveLength, isOpen = false) {
  const seaLevelPressure = 101325;
  const range = maxWaveLength - minWaveLength;
  const percent = (wavelength - minWaveLength) / range;
  const tone = (2 * percent) + 6;
  let airPressure = pressureInchToPascal(airPressureInches);
  let toeHoleHeight = (wavelength / tone) * Math.sqrt(airPressure / seaLevelPressure);
  return toeHoleHeight;
}
const pressureInchToPascal = inch => inch * 249.0889;
const metersToFeet = meters => meters * 3.28084;
const celsiusToFahrenheit = celsius => (celsius * (9 / 5)) + 32;
const celsiusToKelvin = celsius => celsius + 273.15
const metersPerSecondToMilesPerHour = metersPerSecond => metersPerSecond * 2.23694;

const airPressureInches = 5;
const isOpen = false;

// Front Royal, VA, USA
const temperature = 26.111; // 79F avg spring/summer
const temperatureF = celsiusToFahrenheit(temperature);

const elevation = 173.126; // 568 feet
const elevationF = metersToFeet(elevation);
const humidity = 0.64; // 64% February, higher throughout year
const speedOfSound = calcSpeedOfSound(temperature, elevation, humidity);
const speedOfSoundMPH = metersPerSecondToMilesPerHour(speedOfSound);

const piano = [];
for (let i = 0; i < 88; i++) {
  piano[i] = 21 + i;
}
const raffinBusker = [43, 48, 50, 52, 53, 54, 55, 57, 59,
  60, 62, 64, 65, 66, 67, 69, 71, 72, 74, 76];

const midi = raffinBusker;
const minWaveLength = calcWaveLength(midiToFrequency(midi[0]), speedOfSound)
const maxWaveLength = calcWaveLength(midiToFrequency(midi.at(-1)), speedOfSound);

console.log(`Temperature: ${temperature.toFixed(1)}°C | ${temperatureF.toFixed(1)}°F`);
console.log(`Elevation: ${elevation.toFixed(0)} meters | ${elevationF.toFixed(0)} feet`)
console.log(`Speed of sound: ${speedOfSound.toFixed(3)} meters per second | ${speedOfSoundMPH.toFixed(3)} miles per hour`)
console.log(`Humidity: ${(humidity * 100).toFixed(0)}%`);
console.log(`Pipe Type: ${isOpen ? 'Open' : 'Closed'}`);

for (let i = 0; i < midi.length; i++) {
  const midiNumber = midi[i];
  const noteName = midiToNoteName(midiNumber);
  const hz = midiToFrequency(midiNumber);
  const waveLength = calcWaveLength(hz, speedOfSound);
  const pipeLength = calcPipeLength(waveLength, isOpen);
  const pipeDiameter = calcPipeDiameter(waveLength, isOpen);
  const pipeToeHole = calcToeHole(waveLength, airPressureInches, minWaveLength, maxWaveLength, isOpen);

  console.log(`MIDI ${midiNumber} ${noteName} Frequency ${hz.toFixed(3)}Hz Wavelength: ${waveLength.toFixed(3)
    }m Pipe: ${pipeDiameter.toFixed(3)} x ${pipeDiameter.toFixed(3)} x ${pipeLength.toFixed(3)
    }m Hole ${pipeToeHole.toFixed(3)}m`);
}