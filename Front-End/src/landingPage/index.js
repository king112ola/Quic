// magic effect -> ../lib/css/magic.min.css
// https://www.minimamente.com/project/magic/#google_vignette
const selector = document.querySelector('.exploreButtonDiv');
selector.classList.add('magictime', 'vanishIn');

// vanishIn swashIn




// Type Writer Effect
const typewriter = new Typewriter('#summaryText', {
    loop: true,
  });

typewriter.typeString('Summarize, Music, Text, Picture')
  .pauseFor(2500)
  .deleteAll()
  .start();







// detailedSummary  
$('#detailedSummary').textillate({
  // the default selector to use when detecting multiple texts to animate
  selector: '.texts',

  // enable looping
  loop: true,

  // sets the minimum display time for each text before it is replaced
  minDisplayTime: 2000,

  // sets the initial delay before starting the animation
  // (note that depending on the in effect you may need to manually apply
  // visibility: hidden to the element before running this plugin)
  initialDelay: 0,

  // set whether or not to automatically start animating
  autoStart: true,

  // custom set of 'in' effects. This effects whether or not the
  // character is shown/hidden before or after an animation
  inEffects: [],

  // custom set of 'out' effects
  outEffects: [ 'flash' ],

  // in animation settings
  // in: {
  // 	// set the effect name
  //   effect: 'flash',

  //   // set the delay factor applied to each consecutive character
  //   delayScale: 1.5,

  //   // set the delay between each character
  //   delay: 50,

  //   // set to true to animate all the characters at the same time
  //   sync: false,

  //   // randomize the character sequence
  //   // (note that shuffle doesn't make sense with sync = true)
  //   shuffle: false,

  //   // reverse the character sequence
  //   // (note that reverse doesn't make sense with sync = true)
  //   reverse: false,

  //   // callback that executes once the animation has finished
  //   callback: function () {}
  // },

  // out animation settings.
  out: {
    effect: 'flash',
    delayScale: 3.5,
    delay: 500,
    sync: false,
    shuffle: false,
    reverse: false,
    callback: function () {}
  },

  // callback that executes once textillate has finished
  callback: function () {},

  // set the type of token to animate (available types: 'char' and 'word')
  type: 'char'
});


// wow .js

var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      callback:     function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null,    // optional scroll container selector, otherwise use window,
      resetAnimation: true,     // reset animation on end (default is true)
    }
  );
  wow.init();