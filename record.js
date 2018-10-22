var artyom = new Artyom();
// This function activates artyom and will listen and execute only 1 command (for http connections)
function startOneCommandArtyom() {
  artyom.fatality(); // use this to stop any of

  setTimeout(function() { // if you use artyom.fatality , wait 250 ms to initialize again.
    artyom.initialize({
      lang: "zh-CN", // A lot of languages are supported. Read the docs !
      continuous: false, // recognize 1 command and stop listening !
      listen: true, // Start recognizing
      debug: true, // Show everything in the console
      speed: 1 // talk normally
    }).then(function() {
      console.log("Ready to work !");
    });
  }, 250);
}

// This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
function startContinuousArtyom() {
  // artyom.fatality(); // use this to stop any of

  setTimeout(function() { // if you use artyom.fatality , wait 250 ms to initialize again.
    artyom.initialize({
      lang: "en-GB", // A lot of languages are supported. Read the docs !
      continuous: true, // Artyom will listen forever
      listen: true, // Start recognizing
      debug: true, // Show everything in the console
      speed: 1 // talk normally
    }).then(function() {
      console.log("Ready to work !");
    });
  }, 250);
}


addCommand = function() {
  // Add a single command
  var commandStyle = {
    indexes: ["Sofia","sphere", "stick", "cartoon", "tube", "backbone", "surface"], // These spoken words will trigger the execution of the command
    action: function(i) { // Action to be executed when a index match with spoken word
      console.log(i);
      var j = i
      if(i==0) j=1
      artyom.say(`change style to ${this.indexes[j]}`);
    }
  };

  artyom.addCommands(commandStyle);

  // Add a single command
  var commandStyle = {
    indexes: ["animal","element", "residue", "second structure"], // These spoken words will trigger the execution of the command
    action: function(i) { // Action to be executed when a index match with spoken word
      console.log(i);
      var j = i
      if(i==0) j=1
        console.log(this.indexes[j]);
      artyom.say(`change color to ${this.indexes[j]}`);
    }
  };

  artyom.addCommands(commandStyle);

  // Add a single command
  var commandStyle = {
    indexes: ["x", "y", "z"], // These spoken words will trigger the execution of the command
    action: function(i) { // Action to be executed when a index match with spoken word
      console.log(i);
      artyom.say(`Rotate by ${this.indexes[i]} axis`);
    }
  };

  // artyom.addCommands(commandStyle);

  // Or add multiple commands at time
  var myGroup = [{
    description: "If my database contains the name of a person say something",
    smart: true, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
    // Ways to trigger the command with the voic
    indexes: ["change style to *", "change color to *", "Rotate by * axis", "click *", "切换到*模式", "改成*色", "绕*旋转"],
    // Do something when the commands is triggered
    action: function(i, wildcard) {
      var database = ["Carlos", "bruce", "David", "Joseph", "Kenny"];
      console.log(i, wildcard)
      //If the command "is xxx a good person" is triggered do, else
      artyom.say(wildcard);
    }
  }];

  artyom.addCommands(myGroup);
}


$(window).load(function() {
  if (artyom.speechSupported()) {
    //listArtyomVoices();

    if (localStorage.getItem('firstTime') != 'false') {
      setTimeout(function() {
        artyom.say("Welcome dear developer thanks for visit this website. Read more about how can you use artyom to give a cool touch to your own projects.", {
          onEnd: function() {
            localStorage.setItem('firstTime', 'false');
          }
        });
      }, 500);
    }
  }

  if (artyom.recognizingSupported()) {
    artyom.redirectRecognizedTextOutput(function(recognized, isFinal) {
      if (isFinal) {
        $("#artyom-redirect-output").text(""); //Nothing
      } else {
        $("#artyom-redirect-output").text(recognized);
      }
    });

    artyom.initialize({
      executionKeyword: "and do it now",
      debug: true,
      continuous: true,
      lang: "zh-CN",
      listen: true
    });
    addCommand();
  }
});
