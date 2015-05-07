// origins.js


originsInitLines = [

]


originsObj = {
	"time": {
		key: "the beginning",
		lineObj: {code: "God->init(time);"}
	},
	"God": {
		key: "God",
		lineObj: {code: "<#include God.h>"}
	},
	"heavens": {
		key: "the heavens",
		lineObj: {code: "God->create(heavens);"}
	},
	"earth": {
		key: "the earth",
		lineObj: {code: "God->create(earth);"},
	},
	"void": {
		key: "earth was without form and void",
		lineObj: {code: "assert(typeof(earth)<br>&nbsp;== void);"}
	},
	"light": {
		key: "light",
		lineObj: {code: "God->init(light);"},
	},
}

originsRules = [
	{
		preId: "God",
		rule: "before",
		postId: "time",
		error: "God must first exist to create time"
	},
	{
		preId: "God",
		rule: "before",
		postId: "heavens",
		error: "God must first exist to create the heavens"
	},
	{
		preId: "God",
		rule: "before",
		postId: "earth",
		error: "God must first exist to create the earth"
	},
	{
		preId: "heavens",
		rule: "before",
		postId: "light",
		error: "God creates the heavens before light"
	},
	{
		preId: "time",
		rule: "before",
		postId: "earth",
		error: "time must exist for the earth to begin"
	},
	{
		preId: "earth",
		rule: "before",
		postId: "void",
		error: "the earth cannot be referenced before its creation"
	},
	{
		preId: "void",
		rule: "before",
		postId: "light",
		error: "light can only be created after the earth's void state"
	},
]

// set unset default parameters in the object
for (var id in originsObj) {
	var obj = originsObj[id];
	obj["placed"] = false;
}

