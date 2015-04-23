
genesisInitLines = [
	{code: "<#include God.c>"},
	{code: "<#include earth.c>"},
	{code: "&nbsp;"},
	{code: "int main() {",
	 midCode: [{code: "God.init(earth);"}],
	 endCode: "}",
	 id: "main"}
]


genesisObj = {
	"eden": {
		key: "Garden of Eden",
		lineObj: {code: "garden* eden = earth.eden;"}
	},
	"adam": {
		key: "formed a man from the dust",
		lineObj: {code: "person* adam = God.breathe_life(dust);"}
	},
	"theTree": {
		key: "the tree of the knowledge of good and evil",
		lineObj: {code: "tree* theTree = eden.treeOfKnowledge;"}
	},
	"noFruit": {
		key: "you must not eat",
		lineObj: {code: "assert(adam.eat(theTree.fruit) == false);"},
	},
	"work": {
		key: "the man gave names",
		lineObj: {code: "while (adam.working()) {",
							midCode: [{code: "adam.call_name(animal);", id: "callName"}],
							endCode: "}"},
	},
	"animal": {
		key: "brought them to the man",
		lineObj: {code: "creature* animal = God.choose_from(earth.animals);"},
	},
	"alone": {
		key: "alone",
		lineObj: {code: "if (adam.lonely) {",
					 		 midCode: [{code: "break;", id: "aloneBreak"}],
					 		 endCode: "}"},
	},
	"sleep": {
		key: "deep sleep",
		lineObj: {code: "while (adam.sleeping()) {",
							 midCode: [{code: "break;", id:"sleepBreak"}],
							 endCode: "}"},
	},
	"eve": {
		key: "woman",
		lineObj: {code: "person* eve = God.breathe_life(adam.rib);"},
	},
	"join": {
		key: "one flesh",
		lineObj: {code: "adam.join(eve);"},
	},
	"unashamed": {
		key: "no shame",
		lineObj: {code: "assert(adam.naked && adam.unashamed);"},
	}
}

genesisRules = [
	{
		preId: "eden",
		rule: "before",
		postId: "theTree",
		error: ""
	}
]

// set unset default parameters in the object
for (var id in genesisObj) {
	var obj = genesisObj[id];
	obj["placed"] = false;
}
