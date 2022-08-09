
// Custom JS for the Theme

// Config 
//-------------------------------------------------------------

var companyName = "Car Rental Station"; // Enter your event title


// Initialize Tooltip  
//-------------------------------------------------------------

$('.my-tooltip').tooltip();



// Initialize jQuery Placeholder  
//-------------------------------------------------------------

$('input, textarea').placeholder();



// Toggle Header / Nav  
//-------------------------------------------------------------

$(document).on("scroll",function(){
  if($(document).scrollTop()>39){
    $("header").removeClass("large").addClass("small");
  }
  else{
    $("header").removeClass("small").addClass("large");
  }
});



// Vehicles Tabs / Slider  
//-------------------------------------------------------------

$(".vehicle-data").hide();
var activeVehicleData = $(".vehicle-nav .active a").attr("href");
$(activeVehicleData).show(); 

$(".vehicle-nav li").on("click", function(){

  $(".vehicle-nav .active").removeClass("active");
  $(this).addClass('active');

  $(activeVehicleData).fadeOut( "slow", function() {
    activeVehicleData = $(".vehicle-nav .active a").attr("href");
    $(activeVehicleData).fadeIn("slow", function() {});
  });

  return false;
});



// Vehicles Responsive Nav  
//-------------------------------------------------------------

$("<div />").appendTo("#vehicle-nav-container").addClass("styled-select-vehicle-data");
$("<select />").appendTo(".styled-select-vehicle-data").addClass("vehicle-data-select");
$("#vehicle-nav-container a").each(function() {
  var el = $(this);
  $("<option />", {
    "value"   : el.attr("href"),
    "text"    : el.text()
  }).appendTo("#vehicle-nav-container select");
});

$(".vehicle-data-select").change(function(){
  $(activeVehicleData).fadeOut( "slow", function() {
    activeVehicleData = $(".vehicle-data-select").val();
    $(activeVehicleData).fadeIn("slow", function() {});
  });

  return false;
});



// Initialize Datepicker
//-------------------------------------------------------------------------------
$('.datepicker').datepicker().on('changeDate', function(){
  $(this).datepicker('hide');
});



// Toggle Drop-Off Location
//-------------------------------------------------------------------------------
$(".input-group.drop-off").hide();
$(".different-drop-off").on("click", function(){
	$(".input-group.drop-off").toggle();
  $(".autocomplete-suggestions").css("width", $('.pick-up .autocomplete-location').outerWidth());
  return false;
});



// Scroll to Top Button
//-------------------------------------------------------------------------------

$(window).scroll(function(){
  if ($(this).scrollTop() > 100) {
    $('.scrollup').removeClass("animated fadeOutRight");
    $('.scrollup').fadeIn().addClass("animated fadeInRight");
  } else {
    $('.scrollup').removeClass("animated fadeInRight");
    $('.scrollup').fadeOut().addClass("animated fadeOutRight");
  }
});

$('.scrollup, .navbar-brand').click(function(){
  $("html, body").animate({ scrollTop: 0 }, 'slow', function(){
    $("nav li a").removeClass('active');
  });
  return false;
});




// Scroll To Animation
//-------------------------------------------------------------------------------

var scrollTo = $(".scroll-to");

scrollTo.click( function(event) {
  $('.modal').modal('hide');
  var position = $(document).scrollTop();
  var scrollOffset = 110;

  if(position < 39)
  {
    scrollOffset = 260;
  }

  var marker = $(this).attr('href');
  $('html, body').animate({ scrollTop: $(marker).offset().top - scrollOffset}, 'slow');

  return false;
});



// setup autocomplete - pulling from locations-autocomplete.js
//-------------------------------------------------------------------------------

$('.autocomplete-location').autocomplete({
  lookup: locations
});



// Newsletter Form
//-------------------------------------------------------------------------------

$( "#newsletter-form" ).submit(function() {

  $('#newsletter-form-msg').addClass('hidden');
  $('#newsletter-form-msg').removeClass('alert-success');
  $('#newsletter-form-msg').removeClass('alert-danger');

  $('#newsletter-form input[type=submit]').attr('disabled', 'disabled');

  $.ajax({
    type: "POST",
    url: "php/newsletter.php",
    data: $("#newsletter-form").serialize(),
    dataType: "json",
    success: function(data) {

      if('success' == data.result)
      {
        $('#newsletter-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
        $('#newsletter-form-msg').html(data.msg[0]);
        $('#newsletter-form input[type=submit]').removeAttr('disabled');
        $('#newsletter-form')[0].reset();
      }

      if('error' == data.result)
      {
        $('#newsletter-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
        $('#newsletter-form-msg').html(data.msg[0]);
        $('#newsletter-form input[type=submit]').removeAttr('disabled');
      }

    }
  });

  return false;
});



// Contact Form
//-------------------------------------------------------------------------------

$( "#contact-form" ).submit(function() {

  $('#contact-form-msg').addClass('hidden');
  $('#contact-form-msg').removeClass('alert-success');
  $('#contact-form-msg').removeClass('alert-danger');

  $('#contact-form input[type=submit]').attr('disabled', 'disabled');

  $.ajax({
    type: "POST",
    url: "php/contact.php",
    data: $("#contact-form").serialize(),
    dataType: "json",
    success: function(data) {

      if('success' == data.result)
      {
        $('#contact-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
        $('#contact-form-msg').html(data.msg[0]);
        $('#contact-form input[type=submit]').removeAttr('disabled');
        $('#contact-form')[0].reset();
      }

      if('error' == data.result)
      {
        $('#contact-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
        $('#contact-form-msg').html(data.msg[0]);
        $('#contact-form input[type=submit]').removeAttr('disabled');
      }

    }
  });

  return false;
});



// Car Select Form
//-------------------------------------------------------------------------------

$( "#car-select-form" ).submit(function() {

  var selectedCar = $("#car-select").find(":selected").text();
  var selectedCarVal = $("#car-select").find(":selected").val();
  var selectedCarImage = $("#car-select").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});

// Car Select Form
//-------------------------------------------------------------------------------

$( "#car-select-form-1" ).submit(function() {

  var selectedCar = $("#car-select-1").find(":selected").text();
  var selectedCarVal = $("#car-select-1").find(":selected").val();
  var selectedCarImage = $("#car-select-1").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});

// Car Select Form
//-------------------------------------------------------------------------------

$( "#car-select-form-2" ).submit(function() {

  var selectedCar = $("#car-select-2").find(":selected").text();
  var selectedCarVal = $("#car-select-2").find(":selected").val();
  var selectedCarImage = $("#car-select-2").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});

// Car Select Form
//-------------------------------------------------------------------------------

$( "#car-select-form-3" ).submit(function() {

  var selectedCar = $("#car-select-3").find(":selected").text();
  var selectedCarVal = $("#car-select-3").find(":selected").val();
  var selectedCarImage = $("#car-select-3").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});

// Car Select Form
//-------------------------------------------------------------------------------

$( "#car-select-form-4" ).submit(function() {

  var selectedCar = $("#car-select-4").find(":selected").text();
  var selectedCarVal = $("#car-select-4").find(":selected").val();
  var selectedCarImage = $("#car-select-4").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});

// Car Select Form
//-------------------------------------------------------------------------------

$( "#car-select-form-5" ).submit(function() {

  var selectedCar = $("#car-select-5").find(":selected").text();
  var selectedCarVal = $("#car-select-5").find(":selected").val();
  var selectedCarImage = $("#car-select-5").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});

// Car Select Form
//-------------------------------------------------------------------------------

$( "#car-select-form-6" ).submit(function() {

  var selectedCar = $("#car-select-6").find(":selected").text();
  var selectedCarVal = $("#car-select-6").find(":selected").val();
  var selectedCarImage = $("#car-select-6").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});



$( "#car-select-form-7" ).submit(function() {

  var selectedCar = $("#car-select-7").find(":selected").text();
  var selectedCarVal = $("#car-select-7").find(":selected").val();
  var selectedCarImage = $("#car-select-7").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});

$( "#car-select-form-8" ).submit(function() {

  var selectedCar = $("#car-select-8").find(":selected").text();
  var selectedCarVal = $("#car-select-8").find(":selected").val();
  var selectedCarImage = $("#car-select-8").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});

$( "#car-select-form-9" ).submit(function() {

  var selectedCar = $("#car-select-9").find(":selected").text();
  var selectedCarVal = $("#car-select-9").find(":selected").val();
  var selectedCarImage = $("#car-select-9").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});

$( "#car-select-form-10" ).submit(function() {

  var selectedCar = $("#car-select-10").find(":selected").text();
  var selectedCarVal = $("#car-select-10").find(":selected").val();
  var selectedCarImage = $("#car-select-10").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});



$( "#car-select-form-11" ).submit(function() {

  var selectedCar = $("#car-select-11").find(":selected").text();
  var selectedCarVal = $("#car-select-11").find(":selected").val();
  var selectedCarImage = $("#car-select-11").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});


$( "#car-select-form-12" ).submit(function() {

  var selectedCar = $("#car-select-12").find(":selected").text();
  var selectedCarVal = $("#car-select-12").find(":selected").val();
  var selectedCarImage = $("#car-select-12").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;

  if(validateNotEmpty(selectedCarVal)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#pick-up").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#drop-off").val(dropOffDate+' at '+dropOffTime);

    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});

// Check Out Form
//-------------------------------------------------------------------------------

$( "#checkout-form" ).submit(function() {

  $('#checkout-form-msg').addClass('hidden');
  $('#checkout-form-msg').removeClass('alert-success');
  $('#checkout-form-msg').removeClass('alert-danger');

  $('#checkout-form input[type=submit]').attr('disabled', 'disabled');

  $.ajax({
    type: "POST",
    url: "php/inquiry.php",
    data: $("#checkout-form").serialize(),
    dataType: "json",
    success: function(data) {

      if('success' == data.result)
      {
        $('#checkout-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
        $('#checkout-form-msg').html(data.msg[0]);
        $('#checkout-form input[type=submit]').removeAttr('disabled');

        setTimeout(function(){
          $('.modal').modal('hide');
          $('#checkout-form-msg').addClass('hidden');
          $('#checkout-form-msg').removeClass('alert-success');

          $('#checkout-form')[0].reset();
          $('#car-select-form')[0].reset();
        }, 5000);

      }

      if('error' == data.result)
      {
        $('#checkout-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
        $('#checkout-form-msg').html(data.msg[0]);
        $('#checkout-form input[type=submit]').removeAttr('disabled');
      }

    }
  });

return false;
});


// Not Empty Validator Function
//-------------------------------------------------------------------------------

function validateNotEmpty(data){
  if (data == ''){
    return true;
  }else{
    return false;
  }
}