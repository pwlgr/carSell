$(document).ready(() => {
      $(".menu-icon").on("click", () => {
          $("nav ul").toggleClass("showing");
      });
      $(".offersBtn").click(() => {
          $('html,body').animate({
                  scrollTop: $(".scroll").offset().top
              },
              'slow');
      });
      if (window.location.href.indexOf("new") > -1) {
          $('header').css('height', '10vh');
          $('.motto').hide()
          $('nav').addClass('black');
      } else if (window.location.href.indexOf("show") > -1) {
          $('header').css('height', '10vh');
          $('.motto').hide()
          $('nav').addClass('black');
  
      }
  
      $(window).on("scroll", () => {
          if (window.location.href.indexOf("new") < 1)
              if (window.location.href.indexOf("show") < 1) {
                  if ($(window).scrollTop()) {
                      $('nav').addClass('black');
                      $('.motto').hide()
                  } else {
  
                      $('nav').removeClass('black');
                      $('.motto').show()
                  }
              }
  
  
      })
  });