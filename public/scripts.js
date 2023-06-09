// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver
// This function shows and hides the shot selection in the interface based 
// on whether or not the #opponent checkbox is checked
function showHideShots() {
    // Get the info from the checkbox
          let check = document.getElementById('opponent');
          let rpsls = document.getElementById('rpsls');
          $('.result').hide()
          $('.tohide').hide()
    // Check if the checkbox is checked and show or hide options accordingly
        if (check.checked == true) {
    // Here, instead of just showing all of the options, use similar logic to 
    // check which of the game radio buttons is checked and show only those
    // options relevant to the game being selected (rps or rpsls). You can 
    // use similar jQuery 
            $('.shots_rps').show()
            if (rpsls.checked == true) {
                $('.shots_rpsls').show()
            }
            else {
                $('.shots_rpsls').hide()
            }
        } else {
            $('.shots_rpsls').hide()
            $('.shots_rps').hide()
        }
    }
    // This function clears the input form and also resets the shot selection
    // radio buttons. 
    function startOver () {
        document.getElementById('userinput').reset();
        $('.selecting').show()
        $('.result').hide()
        $('.tohide').hide()
        showHideShots();
    }
    
    async function playGame () {
        // Get which game is being played based on the value in the form
        let game = $('input[type=radio][name=game]:checked').val();
        // Get which shot is being played based on the value in the form
        let shot = $('input[type=radio][name=shot]:checked').val();
        // Identify the base URL based on browser information
        let baseurl = window.location.href + 'app/'
        // Log the base URL
        console.log(baseurl)
        // This constructs a URL for the opponent option ONLY. To incorporate
        // the other option, you can use a conditional to change the URL based
        // on what is selected. You could also write separate functions, or use
        // a conditional somewhere above in this function to construct the 
        // correct URL
        let url = baseurl + game + '/play/' + shot
        // Log the full URL
        console.log(url)	
    
        let response = await fetch(url)
        let result = await response.json()
        // Log the result
        console.log(result)
        let resultText = document.getElementById('theresult');
        let check = document.getElementById('opponent');
        if (check.checked == true) {
            resultText.innerHTML = "You: " + result.player + "<br>Your opponent: " + result.opponent + "<br>Result: " + result.result
        }
        else {
            resultText.innerHTML = result.opponent
        }
        $('.result').show()
        $('.selecting').hide()
        $('.shots_rpsls').hide()
        $('.shots_rps').hide()
        $('.tohide').hide()
        // Here you should include code that uses the DOM API or jQuery to 
        // manipulate another block of HTML in the interface to display the 
        // results in some way. 

        //var result_json = JSON.parse(result);
    }