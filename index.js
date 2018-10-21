$(window).load(function () {
  if (artyom.speechSupported()) {
      // listArtyomVoices();

      if (localStorage.getItem('firstTime') != 'false') {
          setTimeout(function () {
              artyom.say("Welcome dear developer thanks for visit this website. Read more about how can you use artyom to give a cool touch to your own projects.", {
                  onEnd: function () {
                      localStorage.setItem('firstTime', 'false');
                  }
              });
          }, 500);
      }
  }

  if(artyom.recognizingSupported()){
      artyom.redirectRecognizedTextOutput(function(recognized,isFinal){
          if(isFinal){
              $("#artyom-redirect-output").text("");//Nothing
          }else{
              $("#artyom-redirect-output").text(recognized);
          }
      });

      artyom.initialize({
          executionKeyword:"and do it now",
          debug:true,
          continuous:true,
          lang:"en-GB",
          listen:true
      });
  }
});

// A normal command

artyom.addCommands({
  indexes:["Hello","Hey","Hurra"],
  action: function(i){
    // i = index of the recognized option
    console.log("Something matches");
  }
});

artyom.addCommands({
  smart:true,// We need to say that this command is smart !
  indexes:["How many people live in *"], // * = the spoken text after How many people live in is recognized
  action:function(i,wildcard){
    switch(wildcard){
      case "berlin":
        alert("Why should i know something like this ?");
      break;
      case "paris":
        alert("I don't know");
      break;
      default:
        alert("I don't know what city is " + '' + ". try to increase the switch cases !");
      break;
    }
  }
});

artyom.simulateInstruction("How many people live in Paris");
// alert("I don't know ._.");

function startArtyom() {
  console.log('start');
  artyom.initialize({
     lang:"en-GB",// More languages are documented in the library
     continuous:false,//if you have https connection, you can activate continuous mode
     debug:true,//Show everything in the console
     listen:true // Start listening when this function is triggered
  });
}

function stop() {
  artyom.fatality();
}
