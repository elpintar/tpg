// serpent.js

// each key in the object points to a question object
// 		qText - text that [y/n] will appear after
//		(need either bothResp or both yResp and nResp)
//		bothResp - text appearing after *ANY* answer
//		yResp - text appearing after a YES answer
// 		nResp - text appearing after a NO answer
//	optional parameters:
// 		preText - optional text before a question
// 		(need EITHER nextQ OR BOTH yNext AND nNext)
//		nextQ - next question to ask for YES and NO
//		yNext - next question to ask after YES
// 		nNext - next question to ask after NO

var serpentStart = "success";

var serpentObj = {
	"success": {
		preText: ("Compilation success!<br><br>" +
			"Wow! You are really smart.<br><br>"),
		qText: "Would you like to gain more knowledge?",
		yResp: "Great!<br><br>",
		nResp: "Well, listen to what I have to say and " +
			" you think about it.<br><br>",
		nextQ: "specialTrees",
	},
	"specialTrees": {
		qText: "So you know that some trees are more special than others, right?",
		yResp: "Right.<br><br>Now, ",
		nResp: ("Really?<br><br>" + 
			"There definitely are some that are more special. " + 
			"You should really know this if you've been paying attention.<br><br>" +
			"Now, "),
		nextQ: "notEatAny",
	},
	"notEatAny": {
		qText: ("did God really say, " + 
			"\"You shall not eat of any tree in the garden\"?"),
		yResp: ("No, he didn't actually say you can't eat "+
			"from any of the trees.<br>" + 
			"<br>Here now, "),
		nResp: "Yeah, he didn't, right?<br><br>",
		nextQ: "cantTouch"
	},
	"cantTouch": {
		preText: "Now this one tree," +
			" the tree of the knowledge of good and evil...<br><br>",
		qText: "Did God say you couldn't touch this tree?",
		yResp: "No - in fact...he didn't!<br><br>",
		nResp: "Yes!  He didn't say that either.<br><br>",
		nextQ: "doTouch"
	},
	"doTouch": {
		preText: "So obviously, there's something really " + 
			"special about this tree that he's trying to keep from you.<br><br>" +
			"At least touch it - what's the harm in that?  " + 
			"He didn't say you shouldn't do that.<br><br>" +
			"Touch the fruit - it's nice and ripe.<br><br>",
		qText: "Touch?",
		yResp: "See! ",
		nResp: "Aw, come on. ",
		nextQ: "delightful"
	},
	"delightful": {
		qText: "Isn't it the most delightful fruit you've ever seen?",
		yResp: "Yes it is, isn't it - ",
		nResp: "Don't be such a downer - ",
		nextQ: "goodForFood"
	},
	"goodForFood": {
		preText: "just look at it!<br><br>",
		qText: "It is also probably good for food, wouldn't you say?",
		yResp: "Yes, it is very ripe and delicious indeed!<br><br>",
		nResp: "Oh, you don't even know!  " +
			"It is very sweet, and delicious!<br><br>",
		nextQ: "insight"
	},
	"insight": {
		preText: "And what's more, it shall give you insight unto the world." +
			"  Things which you can't even imagine right now.<br><br>",
		qText: "Do you want that insight and wisdom?",
		yResp: "Yes, of course you do.<br><br>",
		nResp: "No, of course you do.  Deep down...you do. ",
		nextQ: "bite"
	},
	"bite": {
		preText: "You know you want it.  "+
			"You know you desire it.<br><br>"+
			"I'm telling you - "+
			"when you eat of it your eyes will be opened, "+
			"and you will be like God, " +
			"having the power of the knowledge of good and evil.<br><br>"+
			"You will be able to no longer follow him blindly, "+
			"but make your own decisions, with your own knowledge, "+
			"and your own judgement.  You shall be that much more "+
			"like God himself.<br><br>"+
			"So now, go on.  Take a bite.<br><br>",
		qText: "Bite the fruit?",
		yResp: "",
		yNext: "(end)",
		nResp: "",
		nextQ: "die"
	},
	"die": {
		preText: "Really?  Is it because you think you will die?<br><br>"+
			"You will not surely die.  "+
			"God is just trying to hide things from you.<br><br>"+
			"One bite from this fruit, and you shall know more than "+
			"you could ever know without it.<br><br>",
		qText: "Bite the fruit?",
		yResp: "",
		yNext: "(end)",
		nResp: "",
		nNext: "worldOpened"
	},
	"worldOpened": {
		preText: "Oh come on!  You know you want it.  "+
			"You will be like God himself!<br><br>"+
			"You'd have to be crazy not to!  You'd have to be an idiot!<br><br>"+
			"...Now, I know you're not an idiot.  "+
			"I know you're smart enough to do this.  "+
			"I'm here for you, aren't I?  "+
			"I want what you want.<br><br>"+
			"Just one bite and I promise you "+
			"the world will be opened to you.<br><br>",
		qText: "Bite the fruit?",
		yResp: "",
		yNext: "(end)",
		nResp: "",
		nNext: "exhausted"
	},
	"exhausted": {
		preText: "You have exhausted the serpent's tactics for now.  "+
			"He slithers away.<br><br>"+
			"However, this is a story that does continue.<br><br>"+
			"The fruit is bitten, "+
			"and what happens next is vitally important.<br><br>",
		qText: "Press enter to continue.",
		bothResp: "(end)",
		nextQ: "(end)"
	}
}

