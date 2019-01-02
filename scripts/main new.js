// create grid
//let numCol = 5;
//let numRow = 5;
let numCol = 0;
let numRow = 0;
let numBox;
let playerPos;
let endPos;

// submitted board size
$("#question").submit(function (event) {
    $(".grid_box").remove();
    console.log("board size requested");
    event.preventDefault();
    if (numCol <= 0 || numRow <= 0) {
        break;
    }
    numCol = $("#numCol").val();
    numRow = $("#numRow").val();




    numBox = numCol * numRow;
    createGrid(numCol, numRow);

    // initial player position
    playerPos = getRandomInt(numBox);
    while (hasObstacle(playerPos)) {
        playerPos = getRandomInt(numBox);
    }
    createPlayer(playerPos);

    // intial end position
    endPos = playerPos;
    while (playerPos == endPos || hasObstacle(endPos)) {
        endPos = getRandomInt(numBox);
    }
    createEnd(endPos);

    // arrow key player movements
    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: //left arrow key
                moveLeft();
                console.log("left");
                break;
            case 38: //up arrow key
                moveUp();
                console.log("up");
                break;
            case 39: //right arrow key
                moveRight();
                console.log("right");
                break;
            case 40: //bottom arrow key
                moveDown();
                console.log("down");
                break;
        }
    });
});

//
//
//

function createGrid(numCol, numRow) {
    $("#grid").css("gridTemplateColumns", "repeat(" + numCol + ", 1fr)");
    $("#grid").css("gridTemplateRows", "repeat(" + numRow + ", 1fr)");

    const numBox = numCol * numRow;

    for (x = 0; x < numBox; x++) {
        const potato = document.createElement('div');
        $(potato).addClass("grid_box");
        // probability of a space being an obstacle
        const obstacle = getRandomInt(8);
        if (obstacle < 4) {
            $(potato).addClass("obstacle");
        }
        $("#grid").append(potato);
    }
}

function createPlayer(playerPos) {
    //console.log({
    //    playerPos,
    //    a: $("#grid:nth-child(" + playerPos + ")")
    //});
    $("#player").remove();
    const player = document.createElement('div');
    $(player).attr("id", "player");
    $("div.grid_box:nth-child(" + playerPos + ")").append(player);
    console.log("READY PLAYER ONE");
}

function createEnd(endPos) {
    const end = document.createElement('div');
    $(end).attr("id", "end");
    $("div.grid_box:nth-child(" + endPos + ")").append(end);

    var endText = document.createElement("p");
    $(endText).attr("id", "endText");
    var endTextContent = document.createTextNode("FINISH");
    endText.appendChild(endTextContent);
    $("#end").append(endText);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function checkWin() {
    if (playerPos == endPos) {
        $("#player").remove();
        $("#end").css("background-color", "red");
        $(".grid_box").css("background-color", "red");
    } else createPlayer(playerPos);
}

function hasObstacle(newPos) {
    const canada = $("div.grid_box:nth-child(" + newPos + ")");
    if (canada.hasClass("obstacle")) {
        return 1;
    } else return 0;
}

// if press arrow key
// move character one div down
//     remove character div
//     left: prev one div
//     right: next one div
//     up: div prev (# of row) div
//     down: div next (# of row) div

function moveLeft() {
    let newPos = playerPos - 1;
    if (playerPos % numCol == 1 || hasObstacle(newPos)) {
        //ERROR
        return;
    } else {
        playerPos = newPos;
        checkWin();
    }
}

function moveRight() {
    let newPos = playerPos + 1;
    if (playerPos % numCol == 0 || hasObstacle(newPos)) {
        //ERROR
        return;
    } else {
        playerPos = newPos;
        checkWin();
    }
}

function moveUp() {
    let newPos = playerPos - numCol;
    if (playerPos <= numCol || hasObstacle(newPos)) {
        //ERROR
        return;
    } else {
        playerPos = newPos;
        checkWin();
    }
}

function moveDown() {
    let newPos = playerPos + numCol;
    if (playerPos > numBox - numCol || hasObstacle(newPos)) {
        //ERROR
        return;
    } else {
        playerPos = newPos;
        checkWin();
    }
}
