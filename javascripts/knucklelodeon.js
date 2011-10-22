// domready ------------------------------------------------------------------

$(function(){
  k.obstacles.init()
  k.registration_form.init()
  k.scroll.init();
})

// namespace -----------------------------------------------------------------
// all site specific javascript is placed under this "k" object

var k = {};


// obstacles -----------------------------------------------------------------
// loads a random obstacle and sets up click events for obstacle links

k.obstacles = {
  // common jQuery elements
  $: { element: "", links: "" }
};

k.obstacles.init = function(){
  // store common elements
  this.$.element = $("#obstacles")
  this.$.links = this.$.element.find("a")

  // add click event to links
  this.$.links.click(function(){ 
    k.obstacles.show($(this)) 
  })

  // load random obstacle
  $(this.$.links[this.random_obstacle()]).click()
};

// grabs a random obstacle based on existing links
k.obstacles.random_obstacle = function(){  
  return Math.floor(Math.random() * this.$.links.length)
};

k.obstacles.show = function($link){
  var $obstacle = this.$.element.find("#obstacle");
  var image_url = "images/obstacles/";
  var name = $link.attr("href").replace("#","")
  var src = image_url + name + ".png";

  // remove current selection on link list
  this.$.element.find(".selected").removeClass("selected");

  // load new image
  $obstacle.find("img").fadeOut(function(){
    // add descriptive class to #obstacle element
    // note: this can shift the image due to styling so this is done here
    $obstacle.attr("class","").addClass(name)
    // alter src
    $(this).attr("src", src).fadeIn();
  })

  // populate h1
  $obstacle.find("h1").fadeOut(function(){
    $(this).html($link.html()).fadeIn();
  })

  // populate h2
  $obstacle.find("h2").fadeOut(function(){
    $(this).html($link.attr("title")).fadeIn();
  })

  // set new selection on link list
  $link.closest("li").addClass("selected");
};


// registration form ---------------------------------------------------------
// sets up label and select interactions

k.registration_form = {
  // common jQuery elements
  $: { form: "", inputs: "" }
};

k.registration_form.init = function(){
  // store common elements
  this.$.form = $("#register form")
  this.$.inputs = this.$.form.find("input")

  // individual initializers
  this.initializers.inputs()
  this.initializers.selects()
};

k.registration_form.initializers = {
  // bring in elements from primary object
  $: k.registration_form.$,

  inputs: function(){
    this.$.inputs
      .focus(function(){
        // fades label on input focus
        $(this).prev("label").addClass("focus")
      })
      .keypress(function(){
        // hides label when user begins typing
        $(this).prev("label").hide()
      })
      .blur(function(){
        // when field loses focus show label if there is no text
        $this = $(this)
        if ($this.val() == "") {
          $this.prev("label").removeClass("focus").show()
        }
      })
  },
  selects: function(){

  }
};


// scroll --------------------------------------------------------------------
// triggers navigation color, timer initialization on scroll

k.scroll = {};

k.scroll.init = function(){
  $(document).scroll(function(){
    var scroll_top = $(this).scrollTop()

    // nav
    if (scroll_top > 0) {
      $("body > nav").addClass("scrolling");
    } else {
      $("body > nav").removeClass("scrolling");
    }

    // timer
    if (scroll_top > 2250 && k.timer.timing != true) {
      k.timer.init();
    }
  })
};


// timer ---------------------------------------------------------------------
// handles the countdown timer in the registration section

k.timer = {
  // common jQuery elements
  $: { element: "" }
};

k.timer.init = function(){
  this.$.element = $("#timer")
  this.current_number = parseInt(this.$.element.html())
  this.countdown()

  // prevents multiple initializations on scroll
  this.timing = true
};

// counts down the timer, stores the current number 
k.timer.countdown = function(){
  var num = this.current_number;
  if (num > 0) {
    if (num.toString().length == 1) {
      num = "0" + num.toString();
    }
    this.$.element.html(num);
    this.current_number -= 1
    setTimeout(function(){ k.timer.countdown() }, 1000);
  } else {
    this.$.element.html("00");
    var markup = "Times Up!<br/><span>(Just Kidding)</span>"
    $("#register aside span").html(markup)
  }
};