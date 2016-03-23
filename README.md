**English to Bangla Alphabet Links
	http://www.bdword.com/(no pronunciation) translation
	https://en.wikibooks.org/wiki/Bengali/Sounds"
    http://www.lexilogos.com/keyboard/bengali.htm
    http://mylanguages.org/bengali_alphabet.php
    *** english definition of bangla word, alphabet and prononuciation
	***http://dsalsrv02.uchicago.edu/cgi-bin/romadict.pl?table=biswas-bengali&page=62&display=simple



Step One- Vocab Object*compile a list of words as an JSONobject
	Tools:
		*Package.JSON
		*Cheerio, request 
		*write json file 
		***http://mylanguages.org/multimedia/bengali_audio_body.php
		//https://www.libsdl.org/
		//http://www.transperfect.com/

	Ex.	var  words = {
					body: {
							head: {
								english: head,
								bangla: matha,
								bangla-alphabet: মত
							}
							hair: {
								english: head,
							}
					}
	}

Step Two- Image Object
	* Do a flickr search for each word in the object 
		and add the top four images to the object 

	To Do: 
		1. Download all the images

Step Three-
	*Pages

	HOME
		* Create buttons for each category 	
		* Onclick Go to Game Page(category)

	PLAY- 
	*level one
		** Get a Random Obj from the Cat 
		** Draw the Card 
		** show them the english and bangla-ask them to type it out
		** If they get it right remove and grab a new card
		** otherwise just grab a new card
		** When they get them all go to level two 


	*level two- 
		 	** show bangla and have them write english 
		 	** hint button - show picture 


	*level three- 
		** show english and have them write bangla 
		** hint button 

	* alphabet
		** seperate consonants and vowels
		** add audio
		
Step Four- HOVER FEATURE: 
	//split- if it's longer than three words
	//loopthrough the and make dictionary calls 
	//if one of them is a verb, return <!-- <span underline  -->

Step Five- Audio: 
	http://www.shabdkosh.com/bn/translate?e=cheese&l=bn

	