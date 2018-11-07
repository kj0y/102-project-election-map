var makePolitician = function(name, partyColor) {
  var politician = {}; //create the object and properties
  politician.name = name;
  politician.partyColor = partyColor;
  politician.electionResults = null;
  politician.totalVotes = 0;
  politician.announcePolitician = function() {
    console.log(this.name + " is running for office!");
  };

  politician.announcePolitician();

  return politician;
};

var politician1 = makePolitician("Leslie Knope", [132, 17, 11]);
var politician2 = makePolitician("Jeremy Jamm", [245, 141, 136]);

console.log(politician1.name + "'s color is: " + politician1.partyColor);
console.log(politician2.name + "'s color is: " + politician2.partyColor);

politician1.electionResults = [
  5,
  1,
  7,
  2,
  33,
  6,
  4,
  2,
  1,
  14,
  8,
  3,
  1,
  11,
  11,
  0,
  5,
  3,
  3,
  3,
  7,
  4,
  8,
  9,
  3,
  7,
  2,
  2,
  4,
  2,
  8,
  3,
  15,
  15,
  2,
  12,
  0,
  4,
  13,
  1,
  3,
  2,
  8,
  21,
  3,
  2,
  11,
  1,
  3,
  7,
  2
];
politician2.electionResults = [
  4,
  2,
  4,
  4,
  38,
  3,
  3,
  1,
  2,
  28,
  8,
  1,
  3,
  9,
  0,
  6,
  1,
  5,
  5,
  1,
  3,
  7,
  8,
  1,
  3,
  3,
  1,
  3,
  2,
  2,
  6,
  2,
  14,
  0,
  1,
  6,
  7,
  3,
  7,
  3,
  6,
  1,
  3,
  27,
  3,
  1,
  2,
  11,
  2,
  3,
  1
];

//adjust for results from recounts
politician1.electionResults[9] = 3;
politician2.electionResults[9] = 26;
politician1.electionResults[4] = 17;
politician2.electionResults[4] = 38;
politician1.electionResults[43] = 11;
politician2.electionResults[43] = 27;

//Total the values in the array for politician votes
politician1.sumTheVotes = function() {
  this.totalVotes = 0;
  for (var i = 0; i < this.electionResults.length; i++) {
    this.totalVotes = this.totalVotes + this.electionResults[i];
  }
};

politician2.sumTheVotes = function() {
  this.totalVotes = 0;
  for (var i = 0; i < this.electionResults.length; i++) {
    this.totalVotes = this.totalVotes + this.electionResults[i];
  }
};

//code from map.js
var state = function(abbrev, capsName, fullname, id)
{
    this.nameAbbrev = abbrev;
    this.nameCAPS = capsName;
    this.nameFull = fullname;
    this.id = id;
 
    this.polys = [];
 
    this.colorBorder = g_map_borderColor;
    this.colorBorderHighlight = g_map_highlightBorderColor;
 
    this.rgbColorHighlight = g_map_highlightRGB;
    this.rgbColor = g_map_baseRGB;
 
    this.renderCount = -1;
    this.gradientOffset = 15;
    this.highlighted = false;
    this.counted = false;
 
    this.onClick = null;
}
//end code from map.js

var setStateResults = function(state) {
  theStates[state].winner = null;
  

  if (politician1.electionResults[state] > politician2.electionResults[state]) {
    theStates[state].winner = politician1;
  } else if (politician2.electionResults[state] > politician1.electionResults[state]) {
    theStates[state].winner = politician2;
  }

  var stateWinner = theStates[state].winner;

  if (stateWinner !== null) {
    theStates[state].rgbColor = stateWinner.partyColor;
  } else {
    theStates[state].rgbColor = [11, 32, 57];
  }
  
  stateName.innerText = theStates[state].nameFull;
  abbrev.innerText = theStates[state].nameAbbrev;
  name1.innerText = politician1.name;
  name2.innerText = politician2.name;
  results1.innerText = politician1.electionResults[state];
  results2.innerText = politician2.electionResults[state];
  
  if (stateWinner === null) {
    winnerName.innerText = "DRAW";
  } else { winnerName.innerText = stateWinner.name;
  }
}

politician1.sumTheVotes();
politician2.sumTheVotes();

console.log(politician1.totalVotes);
console.log(politician2.totalVotes);

var winner = function() {
  if (politician1.totalVotes > politician2.totalVotes) {
    winner = politician1.name;
  } else if (politician2.totalVotes > politician1.totalVotes) {
    winner = politician2.name;
  } else {
    winner = "DRAW"; 
  }
}

winner();

var countryInfoTable = document.getElementById('countryResults');

countryInfoTable.children[0].children[0].children[0].innerText = politician1.name;
countryInfoTable.children[0].children[0].children[1].innerText = politician1.totalVotes;
countryInfoTable.children[0].children[0].children[2].innerText = politician2.name;
countryInfoTable.children[0].children[0].children[3].innerText = politician2.totalVotes;
countryInfoTable.children[0].children[0].children[4].innerText = "WINNER";
countryInfoTable.children[0].children[0].children[5].innerText = winner;
	
var stateInfoTable = document.getElementById('stateResults');
var header = stateInfoTable.children[0];
var body = stateInfoTable.children[1];
var stateName = header.children[0].children[0];
var abbrev = header.children[0].children[1];
var name1 = body.children[0].children[0];
var name2 = body.children[1].children[0];
var results1 = body.children[0].children[1];
var results2 = body.children[1].children[1];
var winnerName = body.children[2].children[1];