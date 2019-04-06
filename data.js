var fs = require("fs");

function load(name, defaultobject) {
    var json;
    try {
        if (!fs.existsSync("data/" + name + ".json")) {
            fs.writeFile("data/" + name + ".json", defaultobject || "{}");
        }

		json = require("./data/" + name + ".json");
        return json;
	} catch (e) {
		console.log(e);
		return false;
	}
}

function save(name, object) {
    fs.writeFile("data/" + name + ".json", JSON.stringify(object, null, 2) || "{}", (error) => {
        if (error) console.err("Failed to save file " + name + ".json!" + error);
    });
}

exports = {
    load: load,
    save: save
};
