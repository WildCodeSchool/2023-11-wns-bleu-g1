export const SPECIALS_CHARACTERES = {
	REGEX_SPECIALS_CHAR: /[({[]/g,
	OPEN_PARENTHESIS: /[(]/,
	CLOSE_PARENTHESIS: ")",
	OPEN_BRACKET: /[[]/,
	CLOSE_BRACKET: "]",
	OPEN_CURLY_BRACKET: /[{]/,
	CLOSE_CURLY_BRACKET: "}",
} as const;

// export const addCloseCharactere = (text: string) => {
// 	const {
// 		OPEN_PARENTHESIS,
// 		OPEN_BRACKET,
// 		OPEN_CURLY_BRACKET,
// 		CLOSE_PARENTHESIS,
// 		CLOSE_BRACKET,
// 		CLOSE_CURLY_BRACKET,
// 	} = SPECIALS_CHARACTERES;

// 	let addChar = "";

// 	if (OPEN_PARENTHESIS.test(text)) {
// 		addChar = text.replace(
// 			OPEN_PARENTHESIS,
// 			(match) => match + CLOSE_PARENTHESIS
// 		);
// 	}

// 	if (OPEN_BRACKET.test(text)) {
// 		addChar = text.replace(OPEN_BRACKET, (match) => match + CLOSE_BRACKET);
// 	}

// 	if (OPEN_CURLY_BRACKET.test(text)) {
// 		addChar = text.replace(
// 			OPEN_CURLY_BRACKET,
// 			(match) => match + CLOSE_CURLY_BRACKET
// 		);
// 	}

// 	console.log("addChar", addChar);
// 	return addChar;
// };
