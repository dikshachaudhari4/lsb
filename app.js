const fs = require('fs');
const path = require('path');
const { default: steganographyClass } = require('any-steganography/dist/steganography.class');


//Raw Image path
const file = path.join(__dirname, 'images', 'test.jpg');
// Encrypted image path
const output = path.join(__dirname, 'images', 'test-with-message.jpg');


//Ceaser cipher code started 
var Cipher;
function enDeCode(encodepara,input){
    let userString = input
    let encode = encodepara;
    let userKey;
    if(userString.length<=26)
      userKey=userString.length;
    else
      userKey=(userString.length)%26;
    
    let cleanString = (userString.trim()).toLowerCase();
    let outputMessage = [];
    let flag;
    if(encode)
       flag=true;
    else 
       flag=false;
  
    for (let i = 0; i < cleanString.length; i++){
      outputMessage.push(codeLetter(cleanString[i], userKey, flag));
    }
  
   Cipher=outputMessage.join("");
  }
  
  
  function convertIndexToLetter(index){
    let alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x", "y","z"];
    let letter = alphabet[index];
    return letter;
  }
  
  function convertLetterToIndex(letter){
    let alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x", "y","z"];
    index = alphabet.indexOf(letter);
    return index;
  }
  
  function calculateNewIndex(letter, userKey, encode){
    let index = Number(convertLetterToIndex(letter));
  
    if (encode) { 
      index = index + Number(userKey); 
    } else {
      index = index - Number(userKey);
    }  
    
    if (index > 25){
      index = index - 26;
    } else if (index < 0) {
      index = index + 26;
    }
    return index;
  }
  
  function codeLetter(letter, userKey, flag){
    //deal with non letter like space or number
    let letterRegEx = /[^a-z]/;
    
    if (letterRegEx.test(letter)){
      return letter;
    } else {
      let newIndex = calculateNewIndex(letter, userKey, flag);
      let codedLetter = convertIndexToLetter(newIndex);
      return codedLetter;
    }
  };
  //Ceaser cipher code ended

   
  const key = '<encryption key with length 256>';
  var plaintext="smt. kashibai navale college of engineering lhfalfhalskfhlaksc sfkhfakf duaidyr3ewry skfjasgfkajf sdkahfkasgfkasgf aspfjoa"+
  "alefahslfkhaskfha afkgiawfiuwqyr akfhrwkefg afaiofyhoawy8r awkfhaksfgakegfak alfhalfhalfhseory693wtrw3rhqkafhakfha"+
  "ladfhalks dasmncai sefyqirud aoswduadcai shdgadfajhg cnzbc, znkc.cma ledip9w 3 r8wperifwe ofiuisd kjvkdvn, zlsshfls"+
  "z;lkcjlkc skfhsakfg akfsjgafksa flesiyfewoytwoeit ewroweytowytoyw epwehoweht wetowutoeyt39tywoeth etpwegerothwohgr0"+
"z;ldjs;fjlfjsdlfjsl fslsfjsfkhsfhk zclhdfkshd sdflhskfhs sfhskghs sefoewyroweyt sgohsrghrh sdfbskfhsue efoerujfr fofoe"
  

//   //****Encryption code***** */
//   //input to ceaser cipher code for encryption 
//   enDeCode(true,plaintext);
//   console.log("cipher encrypted = "+Cipher);

//   //input for stegnography and encyption
//   const buffer = steganographyClass.write(file,Cipher, key);
// fs.writeFile(output, buffer, (err) => {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// });


  //****Decryption code***** */
//input for stegnography and decyption
const bufferread = fs.readFileSync(output);
const message = steganographyClass.decode(bufferread, 'jpg', key);
console.log(message);

//input to ceaser cipher code for decryption 
enDeCode(false,message);
console.log("cipher decrypted = "+Cipher);