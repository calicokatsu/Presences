export const name = "Dictionarium";
export const logo = "https://i.imgur.com/8S0aSTw.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	const presenceData: PresenceData = {};
	presenceData.smallImageKey = getComputedStyle(
		document.querySelector<HTMLDivElement>("#playericon")
	).backgroundImage.match(/^url\("(.*)"\)$/)[1];
	switch (playerState.state) {
		case "Lobby": {
			presenceData.state = "Waiting in lobby";
			break;
		}
		case "Logo": {
			presenceData.state = "Waiting";
			break;
		}
		case "MakeSingleChoice": {
			switch (playerState.choiceType) {
				case "ChooseGameType": {
					presenceData.state = "Choosing a game type";
					break;
				}
				case "ChooseDefinition": {
					presenceData.state = `Voting for a definition of ${
						playerState.prompt.html.match(/<div>(.*?)<\/div>$/)[1]
					}`;
					break;
				}
				case "LikeDefinition": {
					presenceData.state = "Liking definitions";
					break;
				}
				case "ChooseSynonym": {
					presenceData.state = `Voting for a synonym of ${
						playerState.prompt.html.match(/<font.*?>(.*?)(?:: )?<\/font>$/)[1]
					}`;
					break;
				}
				case "LikeSynonym": {
					presenceData.state = "Liking synonyms";
					break;
				}
				case "LikeSentence": {
					presenceData.state = "Liking sentences";
					break;
				}
				case "ChooseSentence": {
					presenceData.state = `Voting for a sentence with ${
						playerState.prompt.html.match(/<div>(.*?)<\/div>$/)[1]
					}`;
					break;
				}
			}
			break;
		}
		case "EnterSingleText": {
			switch (playerState.entryId) {
				case "Definition": {
					presenceData.state = `Creating a definition for ${
						playerState.prompt.html.match(/<font.*?>(.*?)<\/font>/)[1]
					}`;
					break;
				}
				case "Synonym": {
					presenceData.state = `Creating a synonym for ${
						playerState.prompt.html.match(/<font.*?>(.*?)(?:: )?<\/font>/)[1]
					}`;
					break;
				}
				case "Sentence": {
					presenceData.state = `Creating a sentence using ${playerState.word}`;
					break;
				}
			}
		}
	}
	return presenceData;
}
