
genesisInitLines = [
	{code: "<#include God.c>"},
	{code: "<#include earth.c>"},
	{code: ""},
	{code: "int main() {", indent_post: 1},
	{code: "}", indent_pre: 1}
]


genesisObj = {
	"eden": {
		key: "Garden of Eden",
		lineObjs: [{code: "garden* eden = earth.eden;"}]
	},
	"adam": {
		key: "formed a man from the dust",
		lineObjs: [{code: "person* adam = God.breathe_life(dust);"}]
	},
	"theTree": {
		key: "the tree of the knowledge of good and evil",
		lineObjs: [{code: "tree* theTree = eden.treeOfKnowledge;"}]
	},
	"noFruit": {
		key: "you must not eat",
		lineObjs: [{code: "assert(adam.eat(theTree.fruit) == false);"}],
	},
	"work": {
		key: "the man gave names",
		lineObjs: [{code: "while (adam.working()) {", indent_post: 1},
					 		 {code: "}", indent_pre: 1}],
	},
	"animal": {
		key: "brought them to the man",
		lineObjs: [{code: "creature* animal = God.choose_from(earth.animals);"}],
	},
	"call_name": {
		key: "the man called each",
		lineObjs: [{code: "adam.call_name(animal);"}],
	},
	"alone": {
		key: "alone",
		lineObjs: [{code: "if (adam.lonely) {", indent_post: 1},
					 		 {code: "break;", indent: 1},
					 		 {code: "}", indent_pre: 1}],
	},
	"sleep": {
		key: "deep sleep",
		lineObjs: [{code: "while (adam.sleeping()) {", indent_post: 1},
					 		 {code: "}", indent_pre: 1}],
	},
	"eve": {
		key: "woman",
		lineObjs: [{code: "person* eve = God.breathe_life(adam.rib);"}],
	},
	"join": {
		key: "one flesh",
		lineObjs: [{code: "adam.join(eve);"}],
	},
	"unashamed": {
		key: "no shame",
		lineObjs: [{code: "assert(adam.naked && adam.unashamed);"}],
	}
}

function fillInLineObjs(lineObjs) {
	var lineObjParams = ["indent_pre", "indent_post", "indent"];
	for (var i = 0; i < lineObjs.length; i++) {
		var codeObj = lineObjs[i];
		for (var j = 0; j < lineObjParams.length; j++) {
			var param = lineObjParams[j];
			if (!codeObj.hasOwnProperty(param)) {
				codeObj[param] = 0;
			}
		}
	}
}

// set unset default parameters in the object
for (var id in genesisObj) {
	var obj = genesisObj[id];
	obj["placed"] = false;
	var lineObjs = obj["lineObjs"];
	// fill in the missing indent info as 0
	fillInLineObjs(lineObjs);
	fillInLineObjs(genesisInitLines);
}
