/*Не используется*/
$('.sl').slick({
	autoplay:true,
	autoplaySpeed:2000,
	cssEase:'ease-in',
	asNavFor: '.sl2',
	initialSlide: 11
});


$('.sl2').slick({
	dots: true,
	slidesToShow: 7,
	initialSlide: 11,
    centerMode: true,
    centerPadding:'40px',
    asNavFor: '.sl',
    focusOnSelect: true,
    arrows: false,

	responsive:[
	{
breakpoint:1100,
settings: {
	slidesToShow: 6
} 
     },
     {
breakpoint:960,
settings: {
	slidesToShow: 5
} 
     },
     {
breakpoint:800,
settings: {
	slidesToShow: 4
} 
     },
     {
breakpoint:640,
settings: {
	slidesToShow: 3
} 
     },
     {
breakpoint:480,
settings: {
	dots: false,
	slidesToShow: 3,
	centerMode: false

} 
     }

]
	});
