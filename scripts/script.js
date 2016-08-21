const PIECEXBOX = document.querySelector(".piecesBox");
const PUZZLEBOX = document.querySelector(".puzzleBox");
const PATTERN = document.querySelector(".pattern");
const PUZZLE = document.querySelector(".puzzle");
const PATTERNBUTTON = document.querySelector(".helpButton");
const RESTARTBUTTON = document.querySelector(".restartButton");

var count;
var piecesBoxTab;
var piece, emplacement;

var i, j;

/*--Functions--*/
//Help
function showPuzzle()
{
	PATTERN.classList.remove("hide");
	PUZZLE.classList.add("hide");
	PATTERNBUTTON.classList.add("hide");

	setTimeout(function()
	{
		PATTERNBUTTON.classList.remove("hide");
		PATTERN.classList.add("hide");
		PUZZLE.classList.remove("hide");
	}, 1500);
}

//Random
function random()
{
	piecesBoxTab.sort(function()
	{
		location.reload();
		return Math.random() - 0.5;
	});
}

//Rotation pièce 90° quand dBclick
/*function rotate(ev)
{
	ev.target.style.transform = "rotate(90deg)"
}
*/

//Drag & Drop (+ HTML attribute)
function allowDrop(ev)
{
    ev.preventDefault();
}

function dragStart(ev)
{
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.border = "1px dashed black";
}

function dragEnter(ev)
{
	ev.target.style.border = "2px solid white";
}
function dragNoBorder(ev)
{
	ev.target.style.border = "0";
}

function dragBorder(ev)
{
	ev.target.style.border = "1px dashed black";
}



function drop(ev)
{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    ev.target.style.border = "0";

    /*if(ev.target.appendChild(document.getElementById(data)))
    {
    	console.log("ok");
    }
    else
    {
    	ev.target.appendChild(document.getElementById(data));
    }*/
}





/*--Return--*/
piecesBoxTab = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

//Boite de pièces
piecesBoxTab.sort(function()
{
	return Math.random() - 0.5;
});
count = 0;
while(count < piecesBoxTab.length)
{
	piececontainer = document.createElement("div");
	piece = document.createElement("div");

	piececontainer.classList.add("piececontainer");
	piece.classList.add("piece");
	piece.setAttribute("id", "piece" + piecesBoxTab[count]);
	
	piececontainer.setAttribute("ondragover","allowDrop(event)");

	piececontainer.setAttribute("ondrop","drop(event)");

	piececontainer.setAttribute("ondragend","dragBorder(event)");

	piece.setAttribute("draggable","true");

	piece.setAttribute("ondragstart","dragStart(event)");

	PIECEXBOX.appendChild(piececontainer);
	piececontainer.appendChild(piece);
	count++;
}

//Boite Puzzle
i = 0;
while(i < 4)
{
	row = document.createElement("tr");
	row.classList.add("row");
	PUZZLE.appendChild(row);

	j = 0;

	while(j < 4)
	{
		emplacement = document.createElement("td");
		emplacement.classList.add("emplacement");

		emplacement.setAttribute("ondrop","drop(event)");

		emplacement.setAttribute("ondragover","allowDrop(event)");

		emplacement.setAttribute("ondragend","dragNoBorder(event)");

		emplacement.setAttribute("ondragenter","dragEnter(event)");

		emplacement.setAttribute("ondragleave","dragNoBorder(event)");

		row.appendChild(emplacement);

		j++;
	}


	i++;
}



PATTERNBUTTON.onclick = showPuzzle;
RESTARTBUTTON.onclick = random;