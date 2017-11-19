/**
 * Print out text in console
 *
 * @return {[type]} [description]
 */
let test = (a, b) => {
  return `Test: ${a} and ${b}`;
};

$("#menutrigger").click(function(){
    $('.bc-sidebar-wrapper').toggleClass('bc-sidebar-active');
});

$('#sendaddress').click(function(){
	console.log("clciked");
    $('.bc-status-wrapper').addClass('bc-show');
});