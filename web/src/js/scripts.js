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

$('#check').click(function(){
    $('.bc-status-wrapper').addClass('bc-show');
});