var swears = ["fuck", "shit", "cunt", "bitch", "wank", "asshole", "blowjob", "blow job", "neegro", "zipperhead", "nigger", "nigga", "nibber", "nibba", "white people", "faggot", "cock", "tit", "rape"];

var enabled = true; //Enable switch
if (!enabled) return;

for (var i = 0; i < swears.length; i++) {
	if (message.toLowerCase().indexOf(swears[i]) != -1) {
		sendImage("https://i.imgur.com/5YuTf4M.jpg");
		break;
	}
}