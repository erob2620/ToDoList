$('document').ready(function() {


var Item = function(name,desc,reoccuring,dueDate){
	this.name = name;
	this.desc = desc;
	this.reoccuring = reoccuring;
	this.dueDate = dueDate;
};
	$("form[name='itemForm']").submit(function() {
		var itemName = $('#itemName').val();
		var itemDesc = $('#itemDesc').val();
		var reoccuring = $('#itemRec').val();
		var dueDate = $('#dueDate').val();
		var todo = new Item(itemName,itemDesc,reoccuring,dueDate);
		console.log(todo);
		window.close();
	});
	var new_window;
		chrome.app.window.create('addItem.html',
		{
			id: 'add_window',
			bounds: {width:200, height:75}
		});
});