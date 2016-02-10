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




Step One- 
	*compile a list of words as an object
		var  words = {
					body: {
							head: {
								english: head,
								bangla: matha,
								bangla-alphabet: মত
								photo: ....
							}
							hair: {
								english: head,
								bangla: chul,
								bangla-alphabet: চুল্
								photo: ....
							}
					}
	}
	*write a json file  complete

Step Two- 
	*Do a flickr search for each word in the object 
	and add the top four images to the object 


	1. download all the images or save as links?? Which is faster
	2. for each wait for it to have finished makig the request then do next

Step Three- 
	* Create buttons for each category 
	* Onclick render the photos and the english word 
	*level one- 
		* show english and bangla 
	*level two-
		* show multiple choice answers 
	*level three
		* have them type it in
