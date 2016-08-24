import {getTextStrings} from "../index"
import TextStrings_default from "../text_strings/TextStrings_default.json"
jest.disableAutomock()

var langs = ["da","fi","is","sv","nb","nn", "en", "fr", "nl"]

var compareKeys = (lang1, lang2) => {
	var firstLang = getTextStrings(lang1)
	var keys = Object.keys(firstLang)
	var secondLang = getTextStrings(lang2)
	keys.forEach(key => {
		var errorMessage = `Lang: '${lang2}', Missing key: '${key}'`
		expect(secondLang[key]).not.toEqual(undefined,  errorMessage)
		expect(secondLang[key]).not.toEqual("", errorMessage )
	})
}

describe("TextStrings", () => {
	it("it should return Text Strings", () => {
		langs.forEach(lang => expect(getTextStrings(lang)).not.toEqual(undefined, "Cant find TextStrings for: " + lang))
	})

	it("all textstrings should have a equivalent string in all other languages", () => {
		langs.forEach(lang1 => langs.forEach(lang2 => compareKeys(lang1, lang2)))
	})

	it("all languages should have a default textStrings", () => {
		langs.forEach(lang => compareKeys("default", lang))
	})
})