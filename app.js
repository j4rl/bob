document.addEventListener("DOMContentLoaded", function() {
    const back = document.getElementById("myBox");
    const bob = document.createElement("div");
    const btn = document.querySelector(".start");
    const scoreBoard = document.querySelector(".score");
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
    let bobLeft = bobStartY;
    let boardHeight = 15;
    let boardWidth = 85;
    let bobBottomSpace = bobStartX;
    let isJumping = false;
    let isGoingLeft = false;
    let isGoingRight = false;
    let bobJumpSpeed = backHeight / FPS;
    //Timers
    let upTimer;
    let downTimer;
    let rightTimer;
    let leftTimer;
    //check if we need to add more const or vars...

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
            boards.forEach(function(arrObj) {
                arrObj.bottom -= boardSpeed;
                let visual = arrObj.visual;
                visual.style.bottom = arrObj.bottom + 'px';
                if (arrObj.bottom < 5) {
                    let firstBoard = boards[0].visual;
                    firstBoard.remove();
                    boards.shift();
                    score++;
                    scoreBoard.innerHTML = score;
                    let myBoard = new board(backHeight);
                    boards.push(myBoard);
                }
            });
        }
    }

    function fall() {
        //Code to fall if we are clear of boards
        //if we fall to bottom, game over
        isJumping = false;
        clearInterval(upTimer);
        downTimer = setInterval(function() {
            bobBottomSpace -= (boardSpeed + gravity);
            bob.style.bottom = bobBottomSpace + 'px';
            if (bobBottomSpace <= 0) {
                gameOver();
            };
            boards.forEach((currBoard) => {
                if (hit(currBoard)) {
                    console.log(hit(currBoard));
                    bobStartY = bobBottomSpace;
                    jump();
                    isJumping = true;
                }
            });
        }, FPS);
    }

    function hit(arrItem) {
        if (
            (bobBottomSpace >= arrItem.bottom) &&
            (bobBottomSpace <= (arrItem.bottom + boardHeight)) &&
            ((bobLeft + bobWidth) >= arrItem.left) &&
            (bobLeft <= (arrItem.left + arrItem.width)) &&
            !isJumping
        ) {
            return true;
        } else {
            return false;
        }
    }

    function jump() {
        //code to jump
        clearInterval(downTimer);
        isJumping = true;
        upTimer = setInterval(function() {
            bobBottomSpace += bobJumpSpeed;
            bob.style.bottom = bobBottomSpace + 'px';
            if (bobBottomSpace > bobStartY + 200) {
                fall();
                isJumping = false;
            }
        }, FPS);
    }

    function moveLeft() {
        //code to move left
        if (isGoingRight) {
            clearInterval(rightTimer);
            clearInterval(leftTimer);
            isGoingRight = false;
            isGoingLeft = true;
        }
        isGoingLeft = true;
        leftTimer = setInterval(function() {
            if (bobLeft >= 0) {
                bobLeft -= boardSpeed;
                bob.style.left = bobLeft + 'px';
            } else {
                moveRight();
            }
        }, FPS);
    }

    function moveRight() {
        //same as above but to the right
        if (isGoingLeft) {
            clearInterval(leftTimer);
            clearInterval(rightTimer);
            isGoingLeft = false;
            isGoingRight = true;
        }
        isGoingRight = true;
        rightTimer = setInterval(function() {
            if (bobLeft <= backWidth - bobWidth) {
                bobLeft += boardSpeed;
                bob.style.left = bobLeft + 'px';
            } else {
                moveLeft();
            }
        }, FPS);
    }

    function moveStraight() {
        //if not left or right
        isGoingLeft = false;
        isGoingRight = false;
        clearInterval(leftTimer);
        clearInterval(rightTimer);
    }

    function gameOver() {
        //reset interval timers and display score, maybe do a cleanup?
        GameOver = true;
        clearInterval(upTimer);
        clearInterval(downTimer);
        clearInterval(rightTimer);
        clearInterval(leftTimer);
        document.querySelector('.score').innerHTML = score;
        while (back.firstChild) {
            back.removeChild(back.firstChild);
        };
    }

    function control(e) {
        //control of the keys and tie it to the movement functions
        bob.style.bottom = bobBottomSpace + 'px';
        switch (e.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowUp":
                moveStraight();
                break;
            default:
                break;
        }
        // if (e.key === "ArrowLeft") {
        //     moveLeft();
        // } else if (e.key === "ArrowRight") {
        //     moveRight();
        // } else if (e.key === "ArrowUp") {
        //     moveStraight();
        // }
    }


    function main() {
        if (!GameOver) {
            createBoards();
            createBob();
            setInterval(moveBoards, FPS);
            jump(bobStartY);
            document.addEventListener('keyup', control);
        } else {
            gameOver();
        }
    }
    main();


})