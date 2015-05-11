import pyperclip

def textMaker(s):
	maxLineWidth = 57
	reprS = repr(s).strip("'").strip('"')
	reprS = reprS.replace("\\n", "<br>")
	reprS = reprS.replace(" <br>", "<br>")
	reprS = reprS.replace(" <br>", "<br>")
	reprS = reprS.replace("\"", "\\\"")
	textS = ""
	starti = 0
	while starti < len(reprS):
		testLine = reprS[starti:starti+maxLineWidth]
		if len(testLine) < maxLineWidth:
			curLine = testLine
			endi = len(reprS)
		else:
			lastSpace = testLine.rfind(" ") + 1
			lastBreak = testLine.rfind("<br>") + 4
			endi = starti + max(lastSpace, lastBreak)
			if endi == -1:
				endi = len(reprS)
			curLine = reprS[starti:endi]
		if starti == 0:
			curLine = '"' + curLine
		else:
			curLine = " "*6 + '"' + curLine
		if endi < len(reprS):
			curLine = '%s"+\n' % curLine
		else:
			curLine = '%s"' % curLine
		textS += curLine
		starti = endi
	print textS
	pyperclip.copy(textS)


textMaker("""The future generations of Israel settle in the land by the power of the Lord, who sustains them through many hardships and difficulties.

But for the next thousand years will be many signs ... prophecies of a coming time, given by prophets of the Lord.

Of what do these prophecies foretell?

""")










