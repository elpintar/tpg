
passoverInitLines = [
	{code: "import God"},
	{code: "import earth"},
	{code: "import time"},
	{code: "&nbsp;"},
]


passoverObj = {
	"israelites": {
		key: "the whole community of Israel",
		lineObj: {code: "israelites = earth.israelites"},
	},
	"egypt": {
		key: "Egypt",
		lineObj: {code: "egypt = earth.egypt"},
	},
	"moses": {
		key: "Moses",
		lineObj: {code: "moses = israelites.leader"},
	},
	"tenthDay": {
		key: "on the tenth day of this month",
		lineObj: {code: "<br>time.waitFor(time.month.day == 10)"}
	},
	"eachHousehold": {
		key: "for each household",
		lineObj: {code: "for family in israelites:",
							endCode: ""}
	},
	"lambs": {
		key: "the sheep or the goats",
		lineObj: {code: "lambs = family.sheep + family.goats"},
	},
	"noDefects": {
		key: "must be year-old males without defect",
		lineObj: {code: "while family.lamb.withDefects:",
							endCode: ""},
	},
	"lamb": {
		key: "take a lamb for his family",
		lineObj: {code: "family.lamb = family.choose(lambs)"}
	},
	"fourteenthDay": {
		key: "the fourteenth day of the month",
		lineObj: {code: "<br>time.waitFor(time.month.day == 14)"},
	},
	"twilight": {
		key: "at twilight",
		lineObj: {code: "time.waitFor(time.day.twilight)"},
	},
	"communityMembers": {
		key: "all the members of the community of Israel",
		lineObj: {code: "for family in israelites:",
							endCode: ""}
	},
	"slaughter": {
		key: "slaughter them",
		lineObj: {code: "family.lamb.slaughter()"},
	},
	"bloodOnDoor": {
		key: "take some of the blood and put it on the"+
					" sides and tops of the doorframes",
		lineObj: {code: "family.doorpost.smear(family.lamb.blood)"},
	},
	"eatLamb": {
		key: "Eat it in haste",
		lineObj: {code: 'family.eat(family.lamb, "quickly")'},
	},
	"midnight": {
		key: "On that same night",
		lineObj: {code: "<br>time.waitFor(time.day.midnight)"},
	},
	"egyptFamilies": {
		key: "pass through Egypt",
		lineObj: {code: "for family in egypt:",
							endCode: ""},
	},
	"doorpostHasBlood": {
		key: "when I see the blood, I will pass over you",
		lineObj: {code: "if (family.doorpost.hasBlood):",
							midCode: [{code: "God.passOver()",
												 id: "GodPassOver"}],
							endCode: ""},
	},
	"strikeDown": {
		key: "strike down every firstborn of both people and animals",
		lineObj: {code: "else:",
							midCode: [{code: "God.kill(family.firstborn)",
												 id: "killFirstborn"},
												{code: "God.kill(family.animals.firstborn)",
												 id: "killAnimalFirstborn"}],
							endCode: ""},
	},
	"judgment": {
		key: "I will bring judgment",
		lineObj: {code: "assert(God.judgment.complete)"},
	},
	"permission": {
		key: "Leave my people, you and the Israelites!",
		lineObj: {code: "if (egypt.permission):",
							midCode: [{code: "israelites.leave(egypt)",
												 id: "leaveEgypt"}],
							endCode: ""},
	},
	"obeyMoses": {
		key: "the Israelites did",
		lineObj: {code: "israelites.obey(moses)"},
	},
	"obeyGod": {
		key: "the Lord had commanded Moses",
		lineObj: {code: "moses.obey(God)"},
	},
	"deliver": {
		key: "the Lord brought the Israelites out of Egypt",
		lineObj: {code: "God.deliver(israelites)"},
	},
}

passoverRules = [
	{
		preId: "israelites",
		rule: "before",
		postId: "moses",
		error: "the Israelites do not exist for Moses to be their leader"
	},
	{
		preId: "egypt",
		rule: "before",
		postId: "egyptFamilies",
		error: "Egypt does not exist to have families"
	},
	{
		preId: "egypt",
		rule: "before",
		postId: "permission",
		error: "Egypt does not exist to give permission"
	},
	{
		preId: "moses",
		rule: "before",
		postId: "obeyMoses",
		error: "Moses does not exist to be obeyed"
	},
	{
		preId: "moses",
		rule: "before",
		postId: "obeyGod",
		error: "Moses does not exist to obey God"
	},
	{
		preId: "tenthDay",
		rule: "before",
		postId: "fourteenthDay",
		error: "the tenth day comes before the fourteenth day"
	},
	{
		preId: "fourteenthDay",
		rule: "before",
		postId: "midnight",
		error: "the fourteenth day comes before the fifteenth day"
	},
	{
		preId: "lambs",
		rule: "before",
		postId: "lamb",
		error: "lambs do not exist to be chosen from"
	},
	{
		preId: "slaughter",
		rule: "before",
		postId: "bloodOnDoor",
		error: "lamb must be slaughtered before using its blood"
	},
	{
		preId: "slaughter",
		rule: "before",
		postId: "eatLamb",
		error: "lamb must be killed before being eaten"
	},
	{
		preId: "bloodOnDoor",
		rule: "before",
		postId: "eatLamb",
		error: "blood must be put on door before eating the lamb"
	},
	{
		preId: "egyptFamilies",
		rule: "before",
		postId: "judgment",
		error: "God's judgment is only complete after killing the firstborn of Egypt"
	},
	{
		preId: "doorpostHasBlood",
		rule: "before",
		postId: "strikeDown",
		error: "God first checks if the family is covered by the blood of the lamb "+
					 "before striking down the firstborn"
	},	
	{
		preId: "judgment",
		rule: "before",
		postId: "permission",
		error: "Egypt only gives permission after God's judgment is complete"
	},
	{
		preId: "obeyMoses",
		rule: "before",
		postId: "deliver",
		error: "the people of Israel must obey before they can be delivered"
	},
	{
		preId: "obeyGod",
		rule: "before",
		postId: "deliver",
		error: "Moses must obey God before the people can be delivered"
	},


	{
		preId: "tenthDay",
		rule: "before",
		postId: "eachHousehold",
		error: "each family must choose their lamb on the tenth day"
	},
	{
		preId: "eachHousehold",
		rule: "hasChild",
		postId: "lambs",
		error: "each family has a different set of lambs"
	},
	{
		preId: "eachHousehold",
		rule: "hasChild",
		postId: "noDefects",
		error: "picking a lamb without defects must be done for each family"
	},
	{
		preId: "noDefects",
		rule: "hasChild",
		postId: "lamb",
		error: "lambs must be chosen while a lamb without defects has not "+
					 "yet been found"
	},
	{
		preId: "fourteenthDay",
		rule: "before",
		postId: "communityMembers",
		error: "each family must slaughter their lamb on the fourteenth day"
	},
	{
		preId: "fourteenthDay",
		rule: "before",
		postId: "twilight",
		error: "twilight is only important on the fourteenth day"
	},
	{
		preId: "communityMembers",
		rule: "before",
		postId: "midnight",
		error: "each family must act before "+
					 "the end of the fourteenth day"
	},
	{
		preId: "twilight",
		rule: "before",
		postId: "communityMembers",
		error: "each family must act after twilight"
	},
	{
		preId: "communityMembers",
		rule: "hasChild",
		postId: "slaughter",
		error: "the lamb must be slaughtered for each family"
	},
	{
		preId: "communityMembers",
		rule: "hasChild",
		postId: "bloodOnDoor",
		error: "each family must smear the blood upon their doorpost"
	},
	{
		preId: "communityMembers",
		rule: "hasChild",
		postId: "eatLamb",
		error: "each family must eat their sacrificed lamb"
	},
	{
		preId: "midnight",
		rule: "before",
		postId: "egyptFamilies",
		error: "each family in egypt is affected after midnight"
	},
	{
		preId: "egyptFamilies",
		rule: "hasChild",
		postId: "doorpostHasBlood",
		error: "God checks the blood on the doorpost for each family in Egypt"
	},
	{
		preId: "doorpostHasBlood",
		rule: "hasChild",
		postId: "GodPassOver",
		error: "God passes over the family's hosue only if there is the blood of the lamb"
	},
	{
		preId: "strikeDown",
		rule: "hasChild",
		postId: "killFirstborn",
		error: "God only kills the firstborn when the family is not protected by "+
					 "the blood of the lamb"
	},
	{
		preId: "strikeDown",
		rule: "hasChild",
		postId: "killAnimalFirstborn",
		error: "God only kills the firstborn animal when the family is not protected by "+
					 "the blood of the lamb"
	},
	{
		preId: "midnight",
		rule: "before",
		postId: "judgment",
		error: "God's judgment is after midnight"
	},
	{
		preId: "permission",
		rule: "hasChild",
		postId: "leaveEgypt",
		error: "the Israelites can't leave without permission"
	},
]

// set unset default parameters in the object
for (var id in passoverObj) {
	var obj = passoverObj[id];
	obj["placed"] = false;
}
