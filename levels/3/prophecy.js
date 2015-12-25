// prophecy.js

prophecyInitLines = []

prophecyObj = {
	"offspring": {
		key: "I will raise up your offspring to succeed you",
		lineObj: {code: "David.offspring = King"}
	},
	"pierced": {
		key: "he was pierced for our transgressions",
		lineObj: {code: "King.pierced()"}
	},
	"bethlehem": {
		key: "Bethlehem Ephrathah",
		lineObj: {code: "King.birthplace = 'Bethlehem'"}
	},
	"blindOpened": {
		key: "Then will the eyes of the blind be opened",
		lineObj: {code: "King.heal('blind')"}
	},
	"spiritInYou": {
		key: "I will put my Spirit in you",
		lineObj: {code: "God.give(God.Spirit)"}
	},
	"highPriestYeshua": {
		key: "High Priest Yeshua",
		lineObj: {code: "King = Yeshua = Jesus"}
	},
	// fake ones
	"sonOfGod": {
		key: "he will be my son",
		lineObj: {}
	},
	"ruler": {
		key: "one who will be ruler over Israel",
		lineObj: {}
	},
	"wounds": {
		key: "by his wounds we are healed",
		lineObj: {}
	},
	"lame": {
		key: "Then will the lame leap like a deer",
		lineObj: {}
	},
	"gather": {
		key: "I will gather you from all the countries" +
				 " and bring you back into your own land.",
		lineObj: {}
	},
	"garments": {
		key: "I have taken away your sin,"+
				 " and I will put fine garments on you.",
		lineObj: {}
	},
	// NEW TESTAMENT
	"sonOfDavid": {
		key: "Joseph son of David",
		lineObj: {code: "David.offspring = King"}
	},
	"letsgo": {
		key: "Let's go to Bethlehem and see this thing that has happened",
		lineObj: {code: "King.birthplace = 'Bethlehem'"}
	},
	"crucified": {
		key: "There they crucified him",
		lineObj: {code: "King.pierced()"}
	},
	"recieveSight": {
		key: "Immediately he received his sight",
		lineObj: {code: "King.heal('blind')"}
	},
	"willBeInYou": {
		key: "will be in you",
		lineObj: {code: "God.give(God.Spirit)"}
	},
	"YeshuaPriesthood": {
		key: "because Jesus (Yeshua) lives forever, he has a permanent priesthood",
		lineObj: {code: "King = Yeshua = Jesus"}
	},
	// fake ones
	"saveFromSins": {
		key: "he will save his people from their sins",
		lineObj: {}
	},
	"mercy": {
		key: '"Son of David, have mercy on me!"',
		lineObj: {}
	},
	"baby": {
		key: "You will find a baby wrapped in"+
				 " cloths and lying in a manger.",
		lineObj: {}
	},
	"kingOfJews": {
		key: "Jesus of Nazareth, the King of the Jews",
		lineObj: {}
	},
	"inMyFather": {
		key: "I am in my Father, and you"+
				 " are in me, and I am in you",
		lineObj: {}
	},
	"sacrificedOnceForAll": {
		key: "He sacrificed for their sins once for all",
		lineObj: {}
	},
}
