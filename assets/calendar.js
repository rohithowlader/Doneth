// Client ID and API key from the Developer Console
var CLIENT_ID = '522152477208-3o1ae98dn8jigu0n0r076h55d5j09dgk.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCtU-CFNAVUFcgTppqDpVAjalLD9JwD1OA';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];


      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar";

      var authorizeButton = document.getElementById('createmeet_button');
      var signoutButton = document.getElementById('signout_button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
          console.log(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          //authorizeButton.style.display = 'none';
          //signoutButton.style.display = 'block';
          console.log("Signed in");
          meetfunction();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
          console.log("Not signed in");
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

     //Meet function
      function meetfunction() {
        var detail = document.getElementById("detail").value
        var start = document.getElementById("starttime").value + "T" + document.getElementById("starttime_t").value + ":00"
        var end = document.getElementById("endtime").value + "T" + document.getElementById("endtime_t").value + ":00"
        var event = {
            "end": {
            "dateTime": end,
            "timeZone": "Asia/Kolkata"
            },
            "start": {
            "dateTime": start,
            "timeZone" : "Asia/Kolkata"
            },
            "conferenceData": {
                "createRequest": {
                    "conferenceSolutionKey": {
                    "type": "hangoutsMeet"
                    },
                    "requestId": "7qxalsvy0e"
                }
            },
            "summary": detail
        };

        var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event,
        'conferenceDataVersion': 1
        });
        console.log(event);

        request.execute(function(event) {
            appendPre('Event created: ' + event.htmlLink);

            // console.log(event);
            document.getElementById("close_reminder_modal").click();
            detail = "";
            start = "";
            end = "";

            openPrompt(event);
            
        });
      }


      function openPrompt(event) {

        document.getElementById('prompt_result').click();

        var html = '';
        if(event.code!=400){
            html = '<lottie-player src="https://assets7.lottiefiles.com/packages/lf20_y2hxPc.json"  background="transparent"  speed="1"  style="width: 120px; height: 120px;"    autoplay></lottie-player>\
            <br/><p class="summary_text">'+ event.summary +' added</p><a class="createmeet_button" target="_blank" href="'+ event.htmlLink +'">See on Calendar ➝</a>';
        }
        else if(event.code==401) {
            html = '<lottie-player src="https://assets7.lottiefiles.com/packages/lf20_y2hxPc.json"  background="transparent"  speed="1"  style="width: 120px; height: 120px;"    autoplay></lottie-player>\
            <br/><p class="summary_text">Authentication error</p><a class="createmeet_button" target="_blank" href="https://doneth.space">Reload and try again</a>';
        }
        else {
            html = '<lottie-player src="https://assets8.lottiefiles.com/packages/lf20_j3UXNf.json"  background="transparent"  speed="1"  style="width: 120px; height: 120px;"    autoplay></lottie-player>\
            <br/><p class="summary_text">'+ event.error.message +'</p><a class="createmeet_button" data-toggle="modal" data-target="#IntentTriggerModal_setReminder" onclick="closePrompt()">Try again</a>'
        }

        document.getElementById("reminder_block").innerHTML = html;

        signoutButton.click();
      }



      function closePrompt() {
        document.getElementById('close_result_modal').click();
      }