document.addEventListener("DOMContentLoaded", function() {
    const back = document.getElementById("myBox");
    const bob = document.createElement("div");
    const backWidth = 400;
    const backHeight = 600;
    const bobWidth = 60;
    const bobHeight = 85;
    const numBoards = 5;
    const boardSpeed = 4;
    const FPS = 30;
    const gravity = 1;
    let boards = [];
    let score = 0;
    let GameOver = false;
    let bobStartX = 150;
    let bobStartY = 150;
    let bobBottomSpace = bobStartY;

    function createBob() {
        back.appendChild(bob);
        bob.classList.add("bob");
        bob.style.left = bobStartX + "px";
        bob.style.bottom = bobStartY + "px";
    }

    class board {
        constructor(newBoardBottom) {
            this.visual = document.createElement("div");
            this.left = Math.floor(Math.random() * (backWidth - bobWidth));
            this.bottom = newBoardBottom;
            const b = this.visual;
            b.classList.add("platform");
            b.style.left = this.left + "px";
            b.style.bottom = this.bottom + "px";
            back.appendChild(b);
        }
    }

    function createBoards() {
        for (counter = 0; counter < numBoards; counter++) {
            let boardGap = backHeight / numBoards;
            let newBoardBottom = 100 + (counter * boardGap);
            let newBoard = new board(newBoardBottom); // Make new instance of board with parameter of newboardbottom
            boards.push(newBoard);
        }
    }

    function moveBoards() {
        if (bobBottomSpace > 200) {
            boards.forEach((arrObj) => { //Do NOT use the word board here, it WILL fuck shit up
                arrObj.bottom -= boardSpeed;
                let visual = arrObj.visual;
                visual.style.bottom = arrObj.bottom + 'px';
                if (arrObj.bottom < 5) {
                    let firstBoard = boards[0].visual;
                    firstBoard.remove();
                    boards.shift();
                    score++;
                    let myBoard = new board(backHeight);
                    boards.push(myBoard);
                }
            });
        }
    }


    function main() {
        if (!GameOver) {
            createBoards();
            createBob();
            setInterval(moveBoards, FPS);
        } else {

        }
    }

    main();
})