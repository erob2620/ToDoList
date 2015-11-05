chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index.html', {
		id: 'main',
		bounds: { width: 550, height: 400 }
	});
	chrome.syncFileSystem.requestFileSystem(function(fs) {
		fs.root.getFile('test.txt', {create:true},getEntryCallback, errorCallback);
	});
});