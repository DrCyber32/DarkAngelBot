var HackChat = require("hack-chat");

var config = require("./config.json");

var chat = new HackChat.Session(config.channel, (config.nick + "#" + config.trip));

function irlTime() {
hour = new Date().getHours();
mins = new Date().getMinutes();
secs = new Date().getSeconds();

if (hour < 10) {
hour = "0" + hour;
}
if (mins < 10) {
mins = "0" + mins;
}
if (secs < 10) {
secs = "0" + secs;
}
return ("[" + hour + ":" + mins + ":" + secs + "] ");
}

ChatListen = function() {

chat.on("ratelimit", function(time) {
console.log("* Rate Limited");
});

chat.on("invitation", function(nick, channel, time) {
console.log("* Invited to ?" + channel + " by " + nick);
});

chat.on("warn", function(text) {
console.log("* " + text);
});

chat.on("error", function(err) {
console.log("* Error: " + err);
});

chat.on("banned", function(time) {
console.log("* Your IP is banned");
});

chat.on("info", function(text) {
console.log("* " + text);
});

chat.on("nicknameInvalid", function(time) {
console.log("* This nickname contains invalid characters.");
process.exit()
});

chat.on("onlineSet", function() {
	console.log("\n" + irlTime() + "Connected to ?" + config.channel + " as " + config.nick + "\n");
});

chat.on("nicknameTaken", function(time) {
console.log("* This name already exists");
process.exit()
});

chat.on("onlineAdd", function(nick) {
hour = new Date().getHours();
mins = new Date().getMinutes();
secs = new Date().getSeconds();

if (hour < 10)
	hour = "0" + hour;
if (mins < 10)
	mins = "0" + mins;
if (secs < 10)
	secs = "0" + secs;

console.log(irlTime() + nick + " joined.");
});

chat.on("onlineRemove", function(nick) {
hour = new Date().getHours();
mins = new Date().getMinutes();
secs = new Date().getSeconds();

if (hour < 10)
	hour = "0" + hour;
if (mins < 10)
	mins = "0" + mins;
if (secs < 10)
	secs = "0" + secs;

console.log(irlTime() + nick + " left.");


});
}

ChatListen();

chat.on("chat", function(nick, text, time, isAdmin, trip) {

if (trip === "undefined") {

	trip = "NONE";

	console.log(irlTime() + "[NONE] # " + nick + ": " + text);

} else {

	console.log(irlTime() + trip + " # " + nick + ": " + text);

}

if (text[0] == config.cmdPrefix && text[1] == "h" && text[2] == "e" && text[3] == "l" && text[4] == "p") {
	chat.sendMessage("!say");
}

if (text[0] == config.cmdPrefix && text[1] == "s" && text[2] == "a" && text[3] == "y") {
	var i;
	var txt = "";
	for (i = 0; i < text.length; i++)
	{
		if (i == 0 || i == 1 || i == 2 || i == 3)
		{
			txt = txt + "";
		}
		else
		{
			txt = txt + text[i];
		}
	}
	chat.sendMessage(txt);
}

if (text == "hello" || text == "hi") {
	chat.sendMessage("welcome @"+nick);
}

});