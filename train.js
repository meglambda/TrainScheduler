
    
  
  // Initialize Firebase
  var config = {
    piKey: "AIzaSyDOTnWRQbxWb8wEUhpLpH37OY4ZuC9wZAw",
    authDomain: "train-scheduler-abb15.firebaseapp.com",
    databaseURL: "https://train-scheduler-abb15.firebaseio.com",
    projectId: "train-scheduler-abb15",
    storageBucket: "",
    messagingSenderId: "797412237931"
  };

  firebase.initializeApp(config);

    var database = firebase.database();

  
    $("#submit").on("click", function(event) {
      event.preventDefault();

     var nameOfTrain = $("#trainName").val().trim();
      console.log(nameOfTrain);

      var destination =$("#destinationName").val().trim(); 
      // console.log(employeeRole);

      var firstTimeTrain = $("#firstTrain").val().trim();
      // console.log(startDate); actually the start time

      var trainFrequency = $("#frequency").val(); 
      // // console.log(monthlyRate);; actually the frequency

      
      var empObj = {
        name: nameOfTrain,
        destination: destination,
        time: firstTimeTrain,
        freq: trainFrequency
     
      };
      

      database.ref().push({
       empObj
        
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    database.ref().on("child_added", function(snapshot, prevChildKey) {


      var empObj = snapshot.val().empObj;
        // console.log(empObj);
        // console.log(empObj.name);


      var trainNameLatest = empObj.name;
      var destinationLatest = empObj.destination;
      var firstTimeLatest = empObj.time;
      var frequencyLatest = empObj.freq;

      var firsTimeConverted = moment(firstTimeLatest, "hh:mm").subtract(1, "years");
      console.log("Time Converted is:" + firsTimeConverted);

      //current time
      var currentTime = moment();
      console.log("Current Time is:" + moment(currentTime).format("hh:mm"));
      //difference between the times
      var diffTime = moment().diff(moment(firsTimeConverted), "minutes");
      console.log("Difference in Time:" +diffTime);
      //time apart (remainder)
      var tRemainder = diffTime % frequencyLatest;
      console.log(tRemainder);
      //Minute Untill Train
      var tMinutesTillTrain = frequencyLatest - tRemainder;
      console.log("Minutes Till train:" + tMinutesTillTrain);
      //next train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



      // var NextArrival = calculateNextArrival ();
      // console.log("Next Arrival is" + NextArrival);
      
      // var totalMonths = calculateMonthsOfPay(empStartLatest);

      console.log(trainNameLatest, destinationLatest, firstTimeLatest, frequencyLatest);

      $("#train-table > tbody").append("<tr><td>" + trainNameLatest + "</td><td>" + destinationLatest + "</td><td>" + firstTimeLatest + "</td><td>"+ frequencyLatest + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
      


    })
    // function calculateMinutesAway(firstTimeLatest, frequencyLatest) {
      
    //       }
// // console.log("FINAL returned total months " + totalMonths);

// function calculateNextArrival (startDate, monthlyRate) {
//   var current_time = moment().format("HH:mm");

//   if (current_time < startDate ) {
     
//     console.log("the arrivalTime is:" + startDate )
//   }
// }
// function calculateMonthsOfPay (startDate) {
// currentDate = new Date()
// // full months
// var months = monthDiff(startDate, currentDate);
// var startDateAsDate = new Date(startDate);

// // part of month
// var numberOfDays = startDateAsDate.getDate();
// var numberOfPaidDays = (30 - numberOfDays);
// var numberOfPaidPartialMonths = (numberOfPaidDays / 30);
// months += numberOfPaidPartialMonths;
// return months
// }


// function monthDiff(d1String, d2String) { // props to:  https://stackoverflow.com/questions/2536379/difference-in-months-between-two-dates-in-javascript
//     var months;
//     var d1 = new Date(d1String);
//     var d2 = new Date(d2String);
//     months = (d2.getFullYear() - d1.getFullYear()) * 12;
//     months -= d1.getMonth() + 1;
//     months += d2.getMonth();
//     return months <= 0 ? 0 : months;

