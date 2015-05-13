
genesisInitLines = [
	{code: "<#include God.h>"},
	{code: "<#include earth.h>"},
	{code: "&nbsp;"},
	{code: "int main() {",
	 midCode: [{code: "God->init(earth);"}],
	 endCode: "}",
	 id: "main"}
]

genesisObj = {
	"eden": {
		key: "Garden of Eden",
		lineObj: {code: "garden* eden = earth->eden;"}
	},
	"adam": {
		key: "formed a man from the dust",
		lineObj: {code: "person* adam = God->breathe_life(dust);"}
	},
	"theTree": {
		key: "the tree of the knowledge of good and evil",
		lineObj: {code: "tree* theTree = eden->treeOfKnowledge;"}
	},
	"noFruit": {
		key: "you must not eat",
		lineObj: {code: "assert(adam->eat(theTree->fruit) == false);"},
	},
	"work": {
		key: "the man gave names",
		lineObj: {code: "while (adam->working) {",
							midCode: [{code: "adam->call_name(animal);", id: "callName"}],
							endCode: "}"},
	},
	"animal": {
		key: "brought them to the man",
		lineObj: {code: "creature* animal = God->choose_from(earth->animals);"},
	},
	"alone": {
		key: "not good for the man to be alone",
		lineObj: {code: "if (adam->lonely) {",
					 		 midCode: [{code: "break;", id: "aloneBreak"}],
					 		 endCode: "}"},
	},
	"sleep": {
		key: "deep sleep",
		lineObj: {code: "while (adam->sleeping) {",
							 midCode: [{code: "break;", id:"sleepBreak"}],
							 endCode: "}"},
	},
	"eve": {
		key: "God made a woman",
		lineObj: {code: "person* eve = God->breathe_life(adam->rib);"},
	},
	"join": {
		key: "they become one flesh",
		lineObj: {code: "adam->join(eve);"},
	},
	"unashamed": {
		key: "they felt no shame",
		lineObj: {code: "assert(adam->naked && adam->unashamed);"},
	}
}

genesisRules = [
	{
		preId: "eden",
		rule: "before",
		postId: "theTree",
		error: "the tree of the knowledge of good and evil needs the Garden of Eden to exist first"
	},
	{
		preId: "adam",
		rule: "before",
		postId: "noFruit",
		error: "Adam does not exist to eat the fruit"
	},
	{
		preId: "theTree",
		rule: "before",
		postId: "noFruit",
		error: "tree doesn't exist to have attribute 'fruit'"
	},
	{
		preId: "adam",
		rule: "before",
		postId: "work",
		error: "Adam does not exist to do the work"
	},
	{
		preId: "animal",
		rule: "before",
		postId: "callName",
		error: "animal does not exist to be named"
	},
	{
		preId: "work",
		rule: "before",
		postId: "sleep",
		error: "Adam must work before he gets tired enough to sleep"
	},
	{
		preId: "eve",
		rule: "before",
		postId: "join",
		error: "Eve does not exist to join to Adam"
	},
	{
		preId: "join",
		rule: "before",
		postId: "unashamed",
		error: "Adam is only unashamed once he is with Eve"
	},
	{
		preId: "work",
		rule: "hasChild",
		postId: "animal",
		error: "animal must be chosen when Adam is working to name animals"
	},
	{
		preId: "work",
		rule: "hasChild",
		postId: "callName",
		error: "animals must be named only while Adam is working to name them"
	},
	{
		preId: "work",
		rule: "hasChild",
		postId: "alone",
		error: "Adam gets lonely only while he is working to name animals"
	},
	{
		preId: "alone",
		rule: "hasChild",
		postId: "aloneBreak",
		error: "Adam must break from working to gain a suitable helper"
	},
	{
		preId: "sleep",
		rule: "hasChild",
		postId: "eve",
		error: "rib can only be extracted when Adam is asleep"
	},
	{
		preId: "sleep",
		rule: "hasChild",
		postId: "sleepBreak",
		error: "Adam does not wake up"
	},
	{
		preId: "eve",
		rule: "before",
		postId: "sleepBreak",
		error: "Adam wakes up before Eve can be created"
	},
]

// set unset default parameters in the object
for (var id in genesisObj) {
	var obj = genesisObj[id];
	obj["placed"] = false;
}
