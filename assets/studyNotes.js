function renderStudyNotes() {
    var html =
      "<div class='content_block'>\
          <textarea id='notes_recommender' class='input_box_big' rows='4' cols='50' placeholder='What do you want notes for?'></textarea>\
      <button class='intent_button' onclick='renderWritenotes()'>Reset</button><button class='intent_button' id='notes_recommend_button' onclick='findNotes()'>Find Notes</button>\
       <br/><br/>\
      </div>";
  
    document.getElementById("modal_content").innerHTML = html;
  }
  
  function findNotes() {
    var input = "Tell me more about " +
      document.getElementById("notes_recommender").value;
  
    document.getElementById("notes_recommend_button").innerHTML =
      "📔 generating notes . . .";
  
    var url =
      "https://api.openai.com/v1/engines/davinci-instruct-beta/completions";
  
    var return_value = "";
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
  
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", Openai_key);
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
  
        return_value = JSON.parse(xhr.responseText).choices[0].text;
  
        var html =
          "<div class='content_block'>\
          <p class='summary_text'>" +
          return_value +
          "</p>\
      <button class='intent_button' onclick='renderStudyNotes()'>Reset</button>\
       <br/><br/>\
       </div>";
  
        document.getElementById("modal_content").innerHTML = html;
      }
    };
    var data = {
      prompt: input,
      temperature: 1,
      max_tokens: 380,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    console.log(data);
  
    xhr.send(JSON.stringify(data));
  }
  