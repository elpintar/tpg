// desert.js

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

var desertStart = "success";

var desertObj = {
	"success": {
		preText: "Compilation success!<br><br>",
		qText: "Press enter to escape Egypt.",
		bothResp: "",
		nextQ: "camp",
	},
	"camp": {
		preText: "You lead the Israelites out of Egypt, towards the desert.<br><br>"+
			"Then God says, \"Tell the Israelites to turn back "+
			"and encamp near the sea.\"<br><br>"+
			"You think that makes no sense, and want to keep heading "+
			"away from Egypt.<br><br>",
		qText: "Head away from Egypt?",
		yResp: "You take the people further into the desert.<br><br>",
		yNext: "campFail",
		nResp: "You obey God and turn back to camp by the sea.<br><br>",
		nNext: "surrender",
	},
	"campFail": {
		preText: "This was not what God willed, and God punishes you, and "+
      "the people.  Not a good ending.<br><br>",
		qText: "Press enter to revert to the previous decision.",
		bothResp: "",
		nextQ: "camp",
	},
	"surrender": {
		preText: "However, Pharaoh has changed his mind and you see"+
			" the Egyptian army coming to recapture the Israelites.<br><br>"+
			"The people say to you, \""+
			"It would have been better for us to serve the Egyptians "+
			"than to die in the desert!\"<br><br>"+
			"You think there still may be a chance to surrender "+
			"to the Egyptians.<br><br>",
		qText: "Do you surrender?",
		yResp: "You surrender to the Egyptians.<br><br>",
		yNext: "surrenderFail",
		nResp: "Instead of surrendering in fear, you wait, saying to the "+
			"people, \"The Lord will fight for you; you need only to be still.\""+
			"<br><br>",
		nNext: "staff",
	},
	"surrenderFail": {
		preText: "This was not what God willed, and all the Israelites are "+
			"captured, forced back into slavery and worked even harder "+
			"than before. Not a good ending.<br><br>",
		qText: "Press enter to revert to the previous decision.",
		bothResp: "",
		nextQ: "surrender",
	},
	"staff": {
		preText: "Then the Lord tells you to raise your staff over the sea "+
      "to divide the water.<br><br>",
		qText: "Raise staff over the sea?",
		yResp: "You raise your staff over the sea, and the Lord drives "+
      "the sea back with a strong wind, turning it into dry "+
      "land.<br><br>",
		yNext: "hand",
		nResp: "You do not raise your staff.<br><br>",
		nNext: "staffFail",
	},
	"staffFail": {
		preText: "This was not what God willed, and all the Israelites are "+
			"captured, forced back into slavery and worked even harder "+
			"than before. Not a good ending.<br><br>",
		qText: "Press enter to revert to the previous decision.",
		bothResp: "",
		nextQ: "staff",
	},
	"hand": {
		preText: "The Israelites walk across the dry land, with the "+
      "Egyptians still in pursuit.<br><br>Once across, the "+
      "Lord tells you to stretch out your hand over the sea so "+
      "that the waters may flow back over the Egyptians.<br><br>",
		qText: "Stretch out hand over the sea?",
		yResp: "The water flows back and covers all of the Egyptian army "+
      "- not one of them survives.<br><br>",
		yNext: "starve",
		nResp: "You do not stretch out your hand, because you don't "+
      "want to kill the Egyptians.<br><br>",
		nNext: "handFail",
	},
	"handFail": {
		preText: "This was not what God willed, and all the Israelites are "+
			"captured, forced back into slavery and worked even harder "+
			"than before. Not a good ending.<br><br>",
		qText: "Press enter to revert to the previous decision.",
		bothResp: "",
		nextQ: "hand",
	},
	"starve": {
		preText: "The people of Israel praise the Lord.<br><br>Yet they "+
      "quickly become hungry and complain, \"If only we had "+
      "died by the Lord\'s hand in Egypt!  You have brought us "+
      "out into this desert to starve this entire group to "+
      "death.\"<br><br>",
		qText: "Let them starve?",
		yResp: "You leave the Israelites to their own complaining.<br>"+
      "<br>",
		yNext: "starveFail",
		nResp: "God intervenes and says \"I will rain down bread from "+
      "heaven for you.\"<br><br>",
		nNext: "thirsty",
	},
	"starveFail": {
		preText: "This was not what God willed, and God punishes you, and "+
      "the people.  Not a good ending.<br><br>",
		qText: "Press enter to revert to the previous decision.",
		bothResp: "",
		nextQ: "starve",
	},
	"thirsty": {
		preText: "Manna starts to rain down from heaven each day and the "+
      "people have just the amount they need for that day.<br>"+
      "<br>But later, the people grow thirsty and grumble "+
      "against you, \"Why did you bring us out of Egypt to make "+
      "us and our children and our livestock die of "+
      "thirst?\"<br><br>They threaten to kill you with "+
      "stones.<br><br>",
		qText: "Do you threaten them with God's power?",
		yResp: "You use God's power to threaten and scare the Israelites "+
      "into obedience.<br><br>",
		yNext: "thirstyFail",
		nResp: "Then God says to you, \"Go out by the rock at Horeb.  "+
      "Strike the rock and water will come out of it for the "+
      "people to drink.\"  So you do this.<br><br>",
		nNext: "sinai",
	},
	"thirstyFail": {
		preText: "This was not what God willed, and God punishes you, and "+
      "the people.  Not a good ending.<br><br>",
		qText: "Press enter to revert to the previous decision.",
		bothResp: "",
		nextQ: "thirsty",
	},
	"sinai": {
		preText: "Later, you arrive at Mount Sinai.  There is a thick "+
      "cloud around the mountain, and the Lord descends on it "+
      "in fire with thunder and lightning.<br><br>The Lord calls you "+
      "to go up to the top of the mountain.<br><br>",
		qText: "Go up the mountain?",
		yResp: "",
		yNext: "law",
		nResp: "You decline God's invitation to meet him atop the "+
      "mountain.<br><br>",
		nNext: "sinaiFail",
	},
	"sinaiFail": {
		preText: "This was not what God willed, and God punishes you, and "+
      "the people.  Not a good ending.<br><br>",
		qText: "Press enter to revert to the previous decision.",
		bothResp: "",
		nextQ: "sinai",
	},
	"law": {
		preText: "On top of the mountain, God speaks to you the Ten "+
      "Commandments and his covenant law to give to the "+
      "people.<br><br>He writes his law on two tablets of "+
      "stone, inscribed by his own finger.<br><br>",
		qText: "Press enter to recieve the tablets.",
		bothResp: "",
		nextQ: "goldCalf",
	},
	"goldCalf": {
		preText: "You come down the mountain with the tablets, but "+
			"see that the people have "+
      "formed an idol of a golden calf, and are worshipping it "+
      "instead of God.<br><br>",
		qText: "Do you get angry?",
		yResp: "Your anger burns.<br><br>",
		yNext: "forgive",
		nResp: "You decide to let it slide.  But God doesn't, and brings "+
      "disaster upon the people.<br><br>",
		nNext: "goldCalfFail",
	},
	"goldCalfFail": {
		preText: "This was not what God willed, and God punishes you, and "+
      "the people.  Not a good ending.<br><br>",
		qText: "Press enter to revert to the previous decision.",
		bothResp: "",
		nextQ: "goldCalf",
	},
	"forgive": {
		preText: "You smash the stone tablets into pieces at the foot of "+
      "the mountain.<br><br>You grind up the golden calf into "+
      "powder and make the people drink it.<br><br>The Lord "+
      "calls you to execute judgement upon the people and kill "+
      "three thousand by the sword.<br><br>The Lord commands "+
      "you chisel two new tablets and go up the mountain again "+
      "to speak with him.<br><br>",
		qText: "Do you confess for the people and ask for forgiveness?",
		yResp: "You ask for forgiveness and for the Lord to go with you "+
      "and the Israelites.<br><br>",
		yNext: "covenant",
		nResp: "You don't ask for forgiveness, and God's punishment goes "+
      "forth.<br><br>",
		nNext: "forgiveFail",
	},
	"forgiveFail": {
		preText: "This was not what God willed, and God punishes you, and "+
      "the people.  Not a good ending.<br><br>",
		qText: "Press enter to revert to the previous decision.",
		bothResp: "",
		nextQ: "forgive",
	},
	"covenant": {
		preText: "The Lord says, \"I am making a covenant with you.  "+
      "Before all your people I will do wonders never before "+
      "done in any nation in all the world.<br><br>\"Obey what "+
      "I command you today.<br><br>\"Go, and lead the people on "+
      "their way, so that they may enter and possess the land I "+
      "swore to their ancestors to give them.\"<br><br>",
		qText: "Obey and go?",
		yResp: "You go and lead the people, though you yourself will "+
      "never reach the Promised Land.<br><br>",
		yNext: "future",
		nResp: "You don't follow God's command for you.<br><br>",
		nNext: "covenantFail",
	},
	"covenantFail": {
		preText: "This was not what God willed, and God punishes you, and "+
      "the people.  Not a good ending.<br><br>",
		qText: "Press enter to revert to the previous decision.",
		bothResp: "",
		nextQ: "covenant",
	},
	"future": {
		preText: "The future generations of Israel settle in the land by "+
      "the power of the Lord, who sustains them through many "+
      "hardships and difficulties.<br><br>But for the next "+
      "thousand years will be many signs ... prophecies of a "+
      "coming time, given by prophets of the Lord.<br><br>Of "+
      "what do these prophecies foretell?<br><br>",
		qText: "Press enter to continue.",
		bothResp: "",
		nextQ: "(end)"
	}
}

