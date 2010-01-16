function run() {
	var prefs = new gadgets.Prefs(),
		helloWorld = prefs.getMsg('hello_world');
	alert(helloWorld); //"Hello world!" if current language is English
					   //"Chào thế giới!" if current language is Vietnamese
	
	//eXo.social.Locale usage
	var Locale = eXo.social.Locale;
	var helloMsgEl = document.getElementById('helloMsg'),
		helloMsgArgsEl = document.getElementById('helloMsgArgs');
	
	helloMsgEl.innerHTML = Locale.getMsg('hello_world');
	helloMsgArgsEl.innerHTML = Locale.getMsg('hello_user_to_place', ['hoatle', 'Vietnam']);
}

gadgets.util.registerOnLoadHandler(run);