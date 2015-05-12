// gospel.js

gospelInitLines = [
	{code: "import God"},
	{code: "import Jesus"},
	{code: "import earth"},
	{code: "&nbsp;"},
]

gospelObj = {
	"adamSin": {
		key: "one trespass",
		lineObj: {code: "adam.sin()"},
	},
	"condemnation": {
		key: "condemnation for all people",
		lineObj: {code: "earth.people.condemned()"},
	},
	"mosesLaw": {
		key: "law was given through Moses",
		lineObj: {code: "God.give(moses, God.law)<br>&nbsp;"},
	},
	"JesusToEarth": {
		key: "coming into the world",
		lineObj: {code: "earth.add(Jesus)"},
	},
	"becomeHuman": {
		key: "The Word became flesh",
		lineObj: {code: "Jesus.become(human)"},
	},
	"sacrifice": {
		key: "Christ as a sacrifice",
		lineObj: {code: "earth.Jesus.sacrifice()"},
	},
	"defeatDeath": {
		key: "saved through his life",
		lineObj: {code: "Jesus.defeat(earth.death)"},
	},
	"peopleOfTheWorld": {
		key: "the world did not recognize him",
		lineObj: {code: "<br>for person in earth.people:",
							endCode: "&nbsp;"}
	},
	"tryButSin": {
		key: "all have sinned",
		lineObj: {code: "try:",
							midCode: [{code: "person.obey(God)",
												 id: "personObeyGod"},
												{code: "person.sin()",
												 id: "personSin"}],
							endCode: "&nbsp;"},
	},
	"exceptGivenGrace": {
		key: "we have all received grace",
		lineObj: {code: "except:",
							midCode: [{code: "person.given(Jesus.grace)",
												 id: "personGivenGrace"}],
							endCode: "&nbsp;"},
	},
	"ifReceiveAndBelieve": {
		key: "to all who did receive him, to those who believed in his name",
		lineObj: {code: "if (person.receive(Jesus.grace) and<br>"+
										"&nbsp;&nbsp;&nbsp;&nbsp;person.believe(Jesus.name)):",
							endCode: "&nbsp;"},
	},
	"godsWrath": {
		key: "God's wrath",
		lineObj: {code: "person.receive(God.wrath)"},
	},
	"godsEnemy": {
		key: "we were God's enemies",
		lineObj: {code: "person.status = God.enemy"},
	},
	"justifiedByBlood": {
		key: "justified by his blood",
		lineObj: {code: "person.justifiedBy(Jesus.blood)"},
	},
	"righteousnessByFaith": {
		key: "righteousness is given through faith",
		lineObj: {code: "person.given(righteousness)"},
	},
	"passOverSins": {
		key: "passed over former sins",
		lineObj: {code: "God.passOver(person)"},
	},
	"childOfGod": {
		key: "children of God",
		lineObj: {code: "person.status = God.child"},
	},
	"lifeGiven": {
		key: "bring eternal life through Jesus Christ",
		lineObj: {code: "Jesus.life.give(person)"},
	},
}

gospelRules = [
	{
		preId: "peopleOfTheWorld",
		rule: "hasChild",
		postId: "tryButSin",
		error: "each person in the earth must under go a trying experience"
	},
	{
		preId: "tryButSin",
		rule: "hasChild",
		postId: "personObeyGod",
		error: "people try to obey God"
	},
	{
		preId: "tryButSin",
		rule: "hasChild",
		postId: "personSin",
		error: "people try to obey God but sin"
	},
	{
		preId: "exceptGivenGrace",
		rule: "hasChild",
		postId: "personGivenGrace",
		error: "each person would be doomed except for the grace of Christ"
	},
	{
		preId: "exceptGivenGrace",
		rule: "hasChild",
		postId: "ifReceiveAndBelieve",
		error: "after the exception of sin, some do believe in Jesus"
	},
	{
		preId: "exceptGivenGrace",
		rule: "hasChild",
		postId: "godsWrath",
		error: "all people are by default children of wrath after they follow sin"
	},
	{
		preId: "exceptGivenGrace",
		rule: "hasChild",
		postId: "godsEnemy",
		error: "all people are by default God's enemies after they follow sin"
	},
	{
		preId: "ifReceiveAndBelieve",
		rule: "hasChild",
		postId: "justifiedByBlood",
		error: "a person must believe in Jesus to be justified by his blood"
	},
	{
		preId: "ifReceiveAndBelieve",
		rule: "hasChild",
		postId: "righteousnessByFaith",
		error: "a person must believe in Jesus to be given righteousness by faith"
	},
	{
		preId: "ifReceiveAndBelieve",
		rule: "hasChild",
		postId: "passOver",
		error: "a person must believe in Jesus to be passed over in God's judgement"
	},
	{
		preId: "ifReceiveAndBelieve",
		rule: "hasChild",
		postId: "childOfGod",
		error: "a person must believe in Jesus to become his child"
	},
	{
		preId: "ifReceiveAndBelieve",
		rule: "hasChild",
		postId: "lifeGiven",
		error: "a person must believe in Jesus to receive the eternal life given by Christ"
	},


	{
		preId: "adamSin",
		rule: "before",
		postId: "condemnation",
		error: "Adam's sin must first happen for all people to be condemned"
	},
	{
		preId: "condemnation",
		rule: "before",
		postId: "mosesLaw",
		error: "people on earth were condemned before the law"
	},
	{
		preId: "mosesLaw",
		rule: "before",
		postId: "JesusToEarth",
		error: "Jesus must come as the fulfillment of the law after the law is given"
	},
	{
		preId: "becomeHuman",
		rule: "before",
		postId: "sacrifice",
		error: "Jesus can only die and be sacrificed as a human being"
	},
	{
		preId: "JesusToEarth",
		rule: "before",
		postId: "sacrifice",
		error: "Jesus cannot die on the cross until after he comes into the world"
	},
	{
		preId: "sacrifice",
		rule: "before",
		postId: "defeatDeath",
		error: "Jesus must first die in order to defeat death"
	},
	{
		preId: "defeatDeath",
		rule: "before",
		postId: "peopleOfTheWorld",
		error: "death must first be defeated by Jesus before "+
					 "people can be iterated over"
	},
	{
		preId: "tryButSin",
		rule: "before",
		postId: "exceptGivenGrace",
		error: "try must happen before except"
	},
	{
		preId: "personObeyGod",
		rule: "before",
		postId: "personSin",
		error: "people try to do right and obey God before they sin"
	},
	{
		preId: "godsWrath",
		rule: "before",
		postId: "personGivenGrace",
		error: "God's wrath must exist before a person can be given grace"
	},
	{
		preId: "godsEnemy",
		rule: "before",
		postId: "personGivenGrace",
		error: "people are enemies with God before they receive grace"
	},
	{
		preId: "personGivenGrace",
		rule: "before",
		postId: "ifReceiveAndBelieve",
		error: "the grace of Jesus must be given before it is able to be received"
	},
	{
		preId: "justifiedByBlood",
		rule: "before",
		postId: "righteousnessByFaith",
		error: "a person must be justified by the blood of Christ "+
					 "before they can be counted righteous"
	},
	{
		preId: "righteousnessByFaith",
		rule: "before",
		postId: "passOverSins",
		error: "a person must be made righteous before "+
					 "God can pass over their sins"
	},
	{
		preId: "passOverSins",
		rule: "before",
		postId: "childOfGod",
		error: "a person must be made blameless and holy before God "+
					 "in order to become God's child"
	},
	{
		preId: "childOfGod",
		rule: "before",
		postId: "lifeGiven",
		error: "a person must be a child of God before "+
					 "truly taking hold of the richness of life in Jesus"
	},
]

// set unset default parameters in the object
for (var id in gospelObj) {
	var obj = gospelObj[id];
	obj["placed"] = false;
}
