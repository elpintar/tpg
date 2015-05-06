// serpent.js

// each key in the object points to a question object
// 		qText - text that [y/n] will appear after
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
		preText: ("Compilation success!<br>" +
			"Wow! You are really smart.<br>"),
		qText: "Would you like even more knowledge?",
		yResp: "Great!<br>",
		nResp: "Well, listen to this and think about it.<br>",
		nextQ: "specialTrees",
	},
	"specialTrees": {
		qText: "So you know that some trees are more special than others, right?",
		yResp: "Right - I knew you were smart.  Now, ",
		nResp: ("Really?  There definitely are some that are more special.<br>" + 
		"Now what I mean is, "),
		nextQ: "notEatAny",
	},
	"notEatAny" : {
		qText: ("did God really say, " + 
			"\"You shall not eat of any tree in the garden\"?"),
		yResp: ("No, he didn’t actually say that. " + 
			"Come on - don’t you listen?  Here now,  "),
		nResp: "See, he didn’t, right?  So, ",
		nextQ: ""
	}
}

