
import God
import earth
import time

israelites = earth.israelites
egypt = earth.egypt
moses = israelites.leader

time.waitFor(time.month.day == 10)
for family in israelites:
	lambs = family.sheep + family.goats
	while family.lamb.withDefects:
		family.lamb = family.choose(lambs)

time.waitFor(time.month.day == 14)
time.waitFor(time.day.twilight)
for family in israelites:
	family.lamb.slaughter()
	family.doorpost.smear(family.lamb.blood)
	family.eat(family.lamb, "quickly")

time.waitFor(time.day.midnight)
for family in egypt:
	if (family.doorpost.hasBlood):
		God.passOver()
	else:
		God.kill(family.firstborn)
		God.kill(family.animals.firstborn)
assert(God.judgment.complete)
if (egypt.permission):
	israelites.leave(egypt)
israelites.obey(moses)
moses.obey(God)
God.deliver(israelites)

