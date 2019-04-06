const data = require("./data");
const storytime = data.load("storytime");

var ongoing = storytime.enabled || false;
storytime.startMessage = storytime.startMessage || "@here Story time! Type a word (only one!) in to add to the story! Certain random words will ruin the story, so be careful!";
storytime.storyMessage = storytime.storyMessage || "(No story yet)";
storytime.repeatAfter = storytime.repeatAfter || 3;

if (!ongoing) {
    storytime.channel = channel.id;
    channel.send(storytime.startMessage).catch(() => {});;
    channel.send(storytime.storyMessage).then(message => storytime.storyId = message.id).catch(() => {});;
    storytime.enabled = true;
    data.save("storytime", storytime);
} else {
    msgobj.delete().catch(() => {});
    channel.send(sender.tag + " There is already a storytime going in <#" + storytime.channel + ">!").catch(() => {});;
    return;
}
