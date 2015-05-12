// theWord.js


theWordInitLines = [

]


theWordObj = {
	"beginning": {
		key: "the beginning",
		lineObj: {code: "import God"}
	},
	"theWord": {
		key: "the Word",
		lineObj: {code: "import Jesus<br>theWord = Jesus"}
	},
	"withGod": {
		key: "with God",
		lineObj: {code: "theWord.join(God)"}
	},
	"wasGod": {
		key: "was God",
		lineObj: {code: "assert(theWord == God)"},
	},
	"throughHim": {
		key: "Through him all things were made",
		lineObj: {code: "God.through(Jesus)<br>"+
										"&nbsp;&nbsp;&nbsp;&nbsp;.create(all)"}
	},
	"life": {
		key: "life",
		lineObj: {code: "Jesus.contains(life)"},
	},
	"light": {
		key: "light",
		lineObj: {code: "Jesus.light.give(us)"}
	},
	"mankind": {
		key: "all mankind",
		lineObj: {code: "us = all.mankind"}
	},
}

theWordRules = [
	{
		preId: "beginning",
		rule: "before",
		postId: "withGod",
		error: "God must first exist to be with the Word"
	},
	{
		preId: "theWord",
		rule: "before",
		postId: "withGod",
		error: "the Word must first exist to be with God"
	},
	{
		preId: "withGod",
		rule: "before",
		postId: "wasGod",
		error: "the Word and God have not been joined"
	},
	{
		preId: "wasGod",
		rule: "before",
		postId: "throughHim",
		error: "Jesus must be God before God can create through him"
	},
	{
		preId: "throughHim",
		rule: "before",
		postId: "mankind",
		error: "all must be created before mankind can be referenced"
	},
	{
		preId: "mankind",
		rule: "before",
		postId: "light",
		error: "mankind must exist for Jesus to give the light of life to"
	},
	{
		preId: "theWord",
		rule: "before",
		postId: "life",
		error: "Jesus must exist to contain life"
	},
	{
		preId: "theWord",
		rule: "before",
		postId: "light",
		error: "Jesus must contain life before giving the light of life"
	},
]

// set unset default parameters in the object
for (var id in theWordObj) {
	var obj = theWordObj[id];
	obj["placed"] = false;
}

