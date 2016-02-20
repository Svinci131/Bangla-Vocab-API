//trying to get the scrapper page to return the obj not right the file
//then do flickr stuff 


*Package.JSON
*Cheerio, request 
*write json file 
***http://mylanguages.org/multimedia/bengali_audio_body.php
//https://www.libsdl.org/
//http://www.transperfect.com/

**English to Bangla Alphabet (no pronunciation) translation 
http://www.bdword.com/

*** english definition of bangla word, alphabet and prononuciation
***http://dsalsrv02.uchicago.edu/cgi-bin/romadict.pl?table=biswas-bengali&page=62&display=simple

//work on rendering words or 
//work on flickr 




Step One- Vocab Object*compile a list of words as an JSONobject
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

	To do: Check Numbers

Step Two- Image Object
	* Do a flickr search for each word in the object 
		and add the top four images to the object 

	To Do: 
		1. Download all the images
		2. Get three or four images

Step Three-
	*TWO "PAGES"- Home and game play 

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

	To Do: 

	Styling, Hints, back buttons 
