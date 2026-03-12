
// -----------student info image slider -----

export const slider2settings = {
  infinite: true,
  arrows: false,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  slidesToScroll: 1
};

// -----------student info rank slider -----
$('.student-info-rank-slider').slick({
    speed: 4000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: true,
    initialSlide: 1,
    arrows: false,
    buttons: false
});

// -----------student youtube testimonial slider -----
$('.student-yt-slider').slick({
  infinite: true,
  arrows: false,
  dots: true,
  slidesToShow: 2,
  autoplaySpeed: 4000,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 581,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }
  ]
});

// ----------- testimonials slider -----
$('.our-testimonials-slider').slick({
  infinite: true,
  arrows: false,
  dots: true,
  slidesToShow: 2,
  autoplaySpeed: 4000,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 581,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }
  ]
});

// ----------- blogs slider -----
$('.blog-section-slider').slick({
  dots: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 581,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true
      }
    }
  ]
});

// ----------- mobile siderbar toggle -----
$(document).ready(function() {
    $(document).on("click", ".mobile-toggle-btn", function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass("active");
            $("#mySidenav").css("transform", "translateX(110%)");
        } else {
            $(this).addClass("active");
            $("#mySidenav").css("transform", "translateX(0%)");
        }
    });
});

// =====sticky header ===========
$(window).scroll(function() {
    if ($(this).scrollTop() > 10) {
        $('header').addClass("sticky");
    } else {
        $('header').removeClass("sticky");
    }
});

// ====== go to scrollTop ===========
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 40) {
            $('#scroll-button').fadeIn();
        } else {
            $('#scroll-button').fadeOut();
        }
    });
    $('#scroll-button').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 100);
    });
});


// ======= number counter =========
var counted = 0;
$(window).scroll(function() {
    if (counted == 0 && $(window).scrollTop() > 200) {
    $('.count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
    counted = 1;
    }
});



$("#FileInput").on('change',function (e) {
            var labelVal = $(".title").text();
            var oldfileName = $(this).val();
                fileName = e.target.value.split( '\\' ).pop();

                if (oldfileName == fileName) {return false;}
                var extension = fileName.split('.').pop();

            if ($.inArray(extension,['jpg','jpeg','png']) >= 0) {
                $(".filelabel img").removeClass().addClass('fa fa-file-image-o');
                $(".filelabel img, .filelabel .title").css({'color':'#208440'});
                $(".filelabel").css({'border':' 2px solid #208440'});
            }
            else if(extension == 'pdf'){
                $(".filelabel img").removeClass().addClass('fa fa-file-pdf-o');
                $(".filelabel img, .filelabel .title").css({'color':'red'});
                $(".filelabel").css({'border':' 2px solid red'});

            }
  else if(extension == 'doc' || extension == 'docx'){
            $(".filelabel img").removeClass().addClass('fa fa-file-word-o');
            $(".filelabel img, .filelabel .title").css({'color':'#2388df'});
            $(".filelabel").css({'border':' 2px solid #2388df'});
        }
            else{
                $(".filelabel img").removeClass().addClass('fa fa-file-o');
                $(".filelabel img, .filelabel .title").css({'color':'black'});
                $(".filelabel").css({'border':' 2px solid black'});
            }

            if(fileName ){
                if (fileName.length > 10){
                    $(".filelabel .title").text(fileName.slice(0,4)+'...'+extension);
                }
                else{
                    $(".filelabel .title").text(fileName);
                }
            }
            else{
                $(".filelabel .title").text(labelVal);
            }
        });