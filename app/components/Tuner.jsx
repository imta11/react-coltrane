import React from 'react';
import { setNote } from '../actions'

export const allNotes = [
  "C", "C#",  "D", " D#",  "E",  "F",  "F#",  "G", " G#",  "A",  "A#",  "B", 
  "C2","C2#", "D2", "D2#", "E2", "F2", "F2#", "G2", "G2#", "A2", "A2#", "B2", 
  "C3","C3#", "D3", "D3#", "E3", "F3", "F3#", "G3", "G3#", "A3", "A3#", "B3", 
  "C4","C4#", "D4", "D4#", "E4", "F4", "F4#", "G4", "G4#", "A4", "A4#", "B4", 
  "C5","C5#", "D5", "D5#", "E5", "F5", "F5#", "G5", "G5#", "A5", "A5#", "B5", 
];

// Define the set of test frequencies that we'll use to analyze microphone data.
var C2 = 261.6256; // C2 note, in Hz.
//var notes = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];
var test_frequencies = [];
for (var i = 0; i < 48; i++)
{
	var note_frequency = C2 * Math.pow(2, i / 12.0);
	var note_name = allNotes[i % 12];
	var note = { "frequency": note_frequency, "name": note_name };
	var just_above = { "frequency": note_frequency * Math.pow(2, 1 / 48), "name": note_name };
	var just_below = { "frequency": note_frequency * Math.pow(2, -1 / 48), "name": note_name };
	test_frequencies = test_frequencies.concat([ just_below, note, just_above ]);
}

class Tuner extends React.Component {
  constructor(props) {
    super();
	  var get_user_media = navigator.getUserMedia;
	  get_user_media = get_user_media || navigator.webkitGetUserMedia;
	  get_user_media = get_user_media || navigator.mozGetUserMedia;
	  get_user_media.call(navigator, { "audio": true }, this.useStream, function() {});

    window.reactStore = props.store

    window.correlationWorker = new Worker("./sound_worker.js");
    window.correlationWorker.addEventListener("message", this.interpretCorrelationResult);
  }

  interpretCorrelationResult(event) {
    var timeseries = event.data.timeseries;
    var frequency_amplitudes = event.data.frequency_amplitudes;

    // Compute the (squared) magnitudes of the complex amplitudes for each
    // test frequency.
    var magnitudes = frequency_amplitudes.map(function(z) { return z[0] * z[0] + z[1] * z[1]; });
    
    // console.log("Magnitudes " + magnitudes);

    // Find the maximum in the list of magnitudes.
    var maximum_index = -1;
    var maximum_magnitude = 0;
    for (var i = 0; i < magnitudes.length; i++)
    {
      if (magnitudes[i] <= maximum_magnitude)
        continue;
      else{
        maximum_index = i;
        maximum_magnitude = magnitudes[i];
      }
    }

    // Compute the average magnitude. We'll only pay attention to frequencies
    // with magnitudes significantly above average.
    var average = magnitudes.reduce(function(a, b) { return a + b; }, 0) / magnitudes.length;
    var median = magnitudes.sort();
    //average = median[magnitudes.length /2];
    var confidence = 0.0 + maximum_magnitude / average;
    var confidence_threshold = 9; // empirical, arbitrary.
    
    // console.log("Confidence " + confidence);
    if (confidence > confidence_threshold) {
      var dominant_frequency = test_frequencies[maximum_index];
      var noteIndex = Math.abs(allNotes.indexOf(dominant_frequency.name))
      //window.reactStore.dispatch(setNote(dominant_frequency.name))
      var groupName = 'component1-group' + noteIndex
      console.log('Click on: ' + groupName)
      var click = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      var el = document.getElementById(groupName);
      el.dispatchEvent(click);
    }
  }

  useStream(stream) {
    var audio_context = new AudioContext();
    var microphone = audio_context.createMediaStreamSource(stream);
    window.source = microphone; // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=934512
    var script_processor = audio_context.createScriptProcessor(1024, 1, 1); //23.38 ms for 44.1 khz

    script_processor.connect(audio_context.destination);
    microphone.connect(script_processor);

    var buffer = [];
    var sample_length_milliseconds = 23.38;
    var recording = true;
    var function_counter = 0;
    // Need to leak this function into the global namespace so it doesn't get
    // prematurely garbage-collected.
    // http://lists.w3.org/Archives/Public/public-audio/2013JanMar/0304.html
    window.captureAudio = function(event)
    {
      if (!recording)
        return;

      buffer = buffer.concat(Array.prototype.slice.call(event.inputBuffer.getChannelData(0)));

      // Stop recording after sample_length_milliseconds.
      if (buffer.length > sample_length_milliseconds * audio_context.sampleRate / 1000)
      {
        recording = false;

        window.correlationWorker.postMessage(
          {
            "timeseries": buffer,
            "test_frequencies": test_frequencies,
            "sample_rate": audio_context.sampleRate
          }
        );

        buffer = [];
        function_counter = function_counter+1;

        // console.log("Sampled " + function_counter);
        setTimeout(function() { recording = true; }, 0);
      }
    };
    script_processor.onaudioprocess = window.captureAudio;
  }

  render() {
    return <div>Tuner Component</div>
  }
}

export default Tuner;
