let xhr = new XMLHttpRequest();

xhr.open('GET','https://api.spotify.com/v1/search?q=arjona&type=artist',false);
xhr.setRequestHeader("Authorization",'Bearer BQBYvKbWtMuGm1Iemo831l1uG4FxJwn5DZF1PTKFvAfkxMH2kzS9EB8dzVsX80thzoV0xzzlg_Rwi7DvLzTOw068uaxHNEiGfCFYtw89d1cn2L_0Ai_b-Exz7C3YmAKJjYxAES30RpKYPjk-7PGlRo_kekR_5to')
xhr.onload = () =>{
console.log(xhr.responseText);
}

xhr.send();