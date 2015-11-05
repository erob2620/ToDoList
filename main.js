$('document').ready(function() {
	var Item = function(name,dueDate){
		this.id = itemList.length;
		this.name = name;
		this.dueDate = new Date(dueDate).toJSON();
	};
	
	var itemList = new Array();
	chrome.storage.sync.get("secretKey", function(list) {
		console.log(list);
		if(list.secretKey != undefined) 
		{
			itemList = list.secretKey;
			console.log(itemList);
		}	
		if(itemList.length > 0) 
		{
			findCorrectId();
		}
	});
	$('#createButton').click(function() {
		var taskName = $('#taskName').val();
		$('#taskName').val("");
		var taskDueDate = $('#taskDueDate').val();
		var newTask = new Item(taskName, taskDueDate);
		itemList.push(newTask);
		sortList();
		findCorrectId();
	});
	function findCorrectId() {
		document.getElementById('taskSection').innerHTML = "";
		document.getElementById('tomorrowSection').innerHTML = "";
		document.getElementById('weekSection').innerHTML = "";
		document.getElementById('OverDueSection').innerHTML = "";

		for(i=0;i<itemList.length;i++) {
			var secondsAway = new Date(itemList[i].dueDate).getTime() - new Date().getTime();
			console.log(secondsAway);
			if(secondsAway < -50000000) {
				placeTodo(itemList[i], 'OverDueSection');
			} else if(secondsAway > -50000000 && secondsAway <= 86400000) {
				placeTodo(itemList[i], 'taskSection');
			} else if(secondsAway > 86400000 && secondsAway <= 172800000) {
				placeTodo(itemList[i], 'tomorrowSection');
			} else if(secondsAway > 172800000 && secondsAway < 604800000) {
				placeTodo(itemList[i], 'weekSection');
			} else {
				placeTodo(itemList[i], 'futureSection');
			}
		};
	};
	function placeTodo(item, section) {
		item.id = i;
		var para = document.createElement('p');
		para.className = "name";
		var datePara = document.createElement('p');
		datePara.className = "date";
		var taskDate = new Date(item.dueDate).toDateString();
		var todayHeader = document.getElementById(section);
		var newLine = document.createElement('br');
		var taskWord = document.createTextNode(item.name);
		var taskDateNode = document.createTextNode(taskDate);
		var taskHeader = document.createElement('span');
		taskHeader.id = item.id + item.name;
		var checkBox = document.createElement('button');
		checkBox.name = item.id + item.name;
		checkBox.id = item.id;
		checkBox.className = "checkBox";
		checkBox.innerHTML = "Complete";
		checkBox.onclick = function(event) {
			$('#' + this.name).fadeOut(400);
			if(this.checked) {
				itemList.splice(this.id,1);
				console.log(itemList);
				chrome.storage.sync.set({"secretKey": itemList},function() {
					console.log(itemList + ": item deleted!");
				});
				findCorrectId();
			}
		};

		taskHeader.className = "task";
		para.appendChild(taskWord);
		datePara.appendChild(taskDateNode);
		taskHeader.appendChild(checkBox);
		taskHeader.appendChild(para);
		taskHeader.appendChild(datePara);
		todayHeader.appendChild(taskHeader);
		todayHeader.appendChild(newLine);
	
	};

	$('#saveButton').click(function() {
		chrome.storage.sync.set({"secretKey": itemList}, function() {
			console.log('saved',itemList);
		});
	});
	function sortList() {
		itemList.sort(function(a,b) {
			return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(); 
		});
		console.log(itemList);
	};
});