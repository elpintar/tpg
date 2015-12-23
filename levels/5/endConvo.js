// endConvo.js

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

var endConvoStart = "success";

var endConvoObj = {
	"success": {
		preText: "Program success!<br><br>You have completed the "+
      "Programmer's Gospel.<br><br>Take a moment to look at the "+
      "code you have completed.<br><br>",
    qText: "Press enter to continue.",
    bothResp: "",
    nextQ: "jobWellDone",
  },
  "jobWellDone": {
  	preText: "That was a job well done!<br><br>",
		qText: "Are you glad you made it to the end?",
		yResp: "Great!<br><br>",
		yNext: "learn",
		nResp: "Well, hopefully you got something out of it!<br><br>",
		nextQ: "learn",
	},
	"learn": {
		qText: "Do you feel like you learned something along the way?",
		yResp: "I'm so glad!<br><br>",
		yNext: "meaning",
		nResp: "Wow!  You sure are knowledgable!<br><br>",
		nextQ: "meaning",
	},
	"meaning": {
		qText: "Do you feel that this journey has been meaningful?",
		yResp: "Good to hear.<br><br>",
		yNext: "ending",
		nResp: "I hope it was in some way.<br><br>",
		nextQ: "ending",
	},
	"ending": {
		preText: "Know that there is even more depth than "+
      "you or I can imagine and so much meaning yet to be "+
      "discovered.<br><br>And the story is not yet "+
      "finished...<br><br>",
    qText: "Press enter to continue.",
    bothResp: "",
    nextQ: "(end)"
	}
}