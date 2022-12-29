
import God
import earth
import time

israelites = earth.israelites
egypt = earth.egypt
moses = israelites.leader

for family in israelites:
	lambs = family.lambs.withoutDefects
	family.lamb = family.chooseFrom(lambs)

time.waitFor(time.twilight)

for family in israelites:
	family.lamb.sacrifice()
	family.doorpost.smear(family.lamb.blood)
	family.eat(family.lamb, "quickly")

time.waitFor(time.midnight)

for family in egypt:
	if (family.doorpost.hasBlood):
		God.passOver(family)
	else:
		God.kill(family.firstborn)
		God.kill(family.animals.firstborn)

assert(God.judgment.complete)
if (egypt.permission):
	israelites.leave(egypt)
israelites.obey(moses)
moses.obey(God)
God.deliver(israelites)

