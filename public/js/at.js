$(function(){
	
	Socialite.load();

	$('.store-link').popover({
		animation: true,
		html: true,
		placement: 'right',
		trigger: 'hover',
		delay: { show: 100, hide: 75 },
		title: function(){
			return $(this).data('store').name;
		},
		content: function(){
			var store = $(this).data('store');
			return store.address + '<br>' + store.city + ', ' + store.state + ' ' + store.zip + '<br>' + store.phone;
		}
	});
});