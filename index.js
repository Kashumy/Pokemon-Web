
const viewport = document.getElementById('viewport');
const content = document.getElementById('content');

const tileSize = 32; // Rozmiar pojedynczego kafelka
const viewportWidth = viewport.clientWidth;
const viewportHeight = viewport.clientHeight;

const numTilesX = 99999// Liczba kafelków w osi X
const numTilesY = 99999; // Liczba kafelków w osi Y
//      99999999*Math.exp(99999)
console.log(numTilesY)
const contentWidth = numTilesX * tileSize;
const contentHeight = numTilesY * tileSize;

content.style.width = contentWidth + 'px';
content.style.height = contentHeight + 'px';

const numVisibleTilesX = Math.ceil((viewportWidth / tileSize)+2);
const numVisibleTilesY = Math.ceil((viewportHeight / tileSize)+3);

let startTileX = 0; // Indeks początkowego kafelka w osi X
let startTileY = 0; // Indeks początkowego kafelka w osi Y

const tileCache = {}; // Obiekt przechowujący kafelki w pamięci podręcznej
const tileMap =[[0,1,1],[1,1,1],[2,1,1],[2,0,1],[1,0,1],[0,0,1],[-1,0,1],[-1,1,1],[3,0,1],[1,-1,1],[2,-1,1],[1,2,1],[2,2,1],[1,3,4],[1,4,4],[1,5,4],[55,52,4],[54,52,4],[53,52,4],[52,52,4],[51,52,4],[59,52,4],[60,52,4],[61,52,4],[62,52,4],[58,52,4],[1,-2,4],[1,-3,4],[1,-4,4],[1,-5,4],[63,50,4],[63,49,4],[63,48,4],[63,51,4],[63,52,4],[63,47,4],[63,46,4],[0,-1,4],[0,-2,4],[-1,-2,4],[-2,-2,4],[62,44,4],[63,44,4],[59,44,4],[60,44,4],[61,44,4],[63,45,4],[57,44,4],[56,44,4],[55,44,4],[54,44,4],[53,44,4],[52,44,4],[50,45,4],[50,44,4],[51,44,4],[58,44,4],[50,47,4],[50,48,4],[50,49,4],[50,50,4],[50,51,4],[50,52,4],[50,46,4],[52,50,1],[52,49,1],[52,48,1],[52,47,1],[3,-1,1],[4,-1,1],[5,-1,1],[52,46,1],[54,47,1],[53,47,1],[53,48,1],[54,48,1],[55,48,1],[55,47,1],[53,49,1],[53,50,1],[54,50,1],[54,49,1],[55,49,1],[56,48,1],[56,47,1],[57,47,1],[57,46,1],[56,46,1],[58,47,1],[58,46,1],[55,50,1],[57,48,1],[58,49,1],[58,50,1],[59,50,1],[60,50,1],[60,49,1],[59,49,1],[59,48,1],[58,48,1],[59,46,1],[60,48,1],[60,46,1],[61,48,1],[61,49,1],[61,50,1],[50,54,0],[52,54,0],[54,54,0],[59,54,0],[61,54,0],[63,54,0],[50,56,0],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[50,60,0],[50,58,0],[63,56,0],[63,58,0],[63,60,0],[48,54,0],[48,52,0],[48,50,0],[48,48,0],[48,56,0],[48,58,0],[48,60,0],[48,46,0],[48,44,0],[48,42,0],[50,42,0],[52,42,0],[54,42,0],[65,54,0],[65,56,0],[65,58,0],[65,60,0],[65,52,0],[65,50,0],[65,48,0],[65,46,0],[65,44,0],[65,42,0],[59,42,0],[61,42,0],[63,42,0],[-3,-4,5],[-4,-4,5],[56,52,5],[-2,0,5],[57,52,5],[61,47,1],[61,46,1],[53,51,1],[54,51,1],[55,51,1],[59,51,1],[60,51,1],[61,51,1],[62,50,1],[62,49,1],[62,48,1],[4,-2,1],[58,51,1],[1,-6,1],[0,-6,1],[0,-5,1],[-1,-5,1],[0,-4,1],[62,51,1],[62,47,1],[62,46,1],[62,45,1],[61,45,1],[60,45,1],[59,45,1],[58,45,1],[56,45,1],[57,45,1],[55,45,1],[54,45,1],[53,45,1],[53,46,1],[-2,-1,1],[-1,-3,1],[-2,-3,1],[-2,-4,1],[-1,-1,1],[51,51,1],[51,50,1],[51,49,1],[51,48,1],[51,47,1],[51,46,1],[51,45,1],[52,45,1],[52,51,1],[59,47,6],[60,47,6],[55,46,7],[54,46,8],[57,49,9],[57,50,9],[57,51,9],[56,51,9],[56,50,9],[56,49,9],[56,54,10],[56,55,10],[56,56,10],[56,53,10],[57,53,10],[57,54,10],[57,55,10],[57,56,10],[56,58,10],[56,59,10],[56,60,10],[56,61,10],[56,57,10],[57,57,10],[57,58,10],[57,59,10],[57,60,10],[57,61,10],[56,62,10],[56,63,10],[56,64,10],[57,64,10],[57,63,10],[57,62,10],[59,63,10],[60,63,10],[58,63,10],[58,64,10],[59,64,10],[60,64,10],[61,64,10],[61,63,10],[62,63,10],[63,63,10],[62,64,10],[63,64,10],[64,64,10],[64,63,10],[65,63,10],[65,64,10],[66,64,10],[67,63,10],[68,63,10],[69,63,10],[66,63,10],[67,64,10],[68,64,10],[69,64,10],[70,63,10],[71,63,10],[70,64,10],[71,64,10],[72,64,10],[72,63,10],[71,66,10],[71,67,10],[72,65,10],[72,66,10],[72,67,10],[71,65,10],[71,68,10],[71,69,10],[71,70,10],[71,71,10],[72,69,10],[72,68,10],[72,70,10],[72,71,10],[72,72,10],[-1,2,10],[-1,3,10],[71,74,10],[71,73,10],[71,72,10],[72,73,10],[72,74,10],[72,75,10],[71,75,10],[73,64,10],[74,64,10],[75,64,10],[76,64,10],[75,63,10],[74,63,10],[73,63,10],[76,63,10],[77,63,10],[78,63,10],[4,0,10],[77,64,10],[78,64,10],[79,64,10],[80,64,10],[81,64,10],[82,64,10],[83,64,10],[84,64,10],[85,64,10],[84,63,10],[83,63,10],[82,63,10],[81,63,10],[80,63,10],[79,63,10],[85,63,10],[86,63,10],[87,63,10],[88,63,10],[87,64,10],[86,64,10],[88,64,10],[88,62,10],[88,61,10],[88,60,10],[88,59,10],[88,58,10],[88,57,10],[87,57,10],[87,58,10],[87,59,10],[87,60,10],[87,61,10],[87,62,10],[72,60,0],[72,58,0],[72,56,0],[74,56,0],[74,60,0],[74,58,0],[76,56,0],[76,58,0],[76,60,0],[72,54,0],[72,52,0],[72,50,0],[74,52,0],[74,50,0],[74,54,0],[76,50,0],[76,52,0],[76,54,0],[76,48,0],[72,48,0],[72,46,0],[72,44,0],[0,-3,0],[76,46,0],[72,42,0],[76,42,0],[76,44,0],[74,46,0],[74,44,0],[74,42,0],[74,48,0],[68,62,10],[68,61,10],[68,60,10],[68,59,10],[68,58,10],[69,59,10],[69,61,10],[69,62,10],[69,60,10],[69,58,10],[69,56,10],[69,55,10],[69,54,10],[69,57,10],[68,56,10],[68,55,10],[68,54,10],[68,53,10],[68,57,10],[68,52,10],[69,52,10],[69,53,10],[69,51,10],[69,50,10],[68,50,10],[68,49,10],[68,48,10],[68,51,10],[69,47,10],[69,48,10],[69,49,10],[69,46,10],[68,46,10],[68,47,10],[69,45,10],[69,44,10],[68,44,10],[68,45,10],[68,43,10],[68,42,10],[69,42,10],[69,43,10],[69,41,10],[68,41,10],[68,40,10],[69,40,10],[56,65,10],[56,66,10],[56,67,10],[56,69,10],[56,70,10],[56,68,10],[57,65,10],[57,66,10],[57,68,10],[57,69,10],[57,70,10],[57,71,10],[57,67,10],[56,71,10],[56,72,10],[56,73,10],[56,74,10],[56,75,10],[57,72,10],[57,73,10],[57,75,10],[57,76,10],[57,74,10],[56,76,10],[56,77,10],[56,78,10],[57,78,10],[57,77,10],[58,77,10],[59,77,10],[60,77,10],[61,77,10],[58,78,10],[59,78,10],[60,78,10],[61,78,10],[62,78,10],[63,78,10],[63,77,10],[64,77,10],[65,77,10],[66,77,10],[62,77,10],[67,77,10],[65,78,10],[64,78,10],[66,78,10],[67,78,10],[68,78,10],[3,1,10],[69,77,10],[70,77,10],[71,77,10],[68,77,10],[69,78,10],[70,78,10],[71,78,10],[71,76,10],[72,77,10],[72,78,10],[72,76,10],[74,77,10],[75,77,10],[76,77,10],[77,77,10],[78,77,10],[73,77,10],[74,78,10],[75,78,10],[76,78,10],[77,78,10],[73,78,10],[78,78,10],[79,78,10],[80,78,10],[81,78,10],[82,78,10],[82,77,10],[80,77,10],[79,77,10],[81,77,10],[84,78,10],[85,78,10],[86,78,10],[87,78,10],[88,78,10],[89,78,10],[88,77,10],[86,77,10],[83,77,10],[84,77,10],[87,77,10],[85,77,10],[83,78,10],[89,77,10],[90,77,10],[90,78,10],[91,78,10],[92,78,10],[93,77,10],[94,77,10],[95,77,10],[96,77,10],[91,77,10],[93,78,10],[94,78,10],[95,78,10],[96,78,10],[97,78,10],[98,78,10],[99,78,10],[100,78,10],[101,78,10],[101,77,10],[100,77,10],[99,77,10],[98,77,10],[97,77,10],[102,77,10],[103,78,10],[104,78,10],[105,78,10],[106,78,10],[107,78,10],[102,78,10],[103,77,10],[104,77,10],[105,77,10],[106,77,10],[107,76,10],[107,77,10],[106,76,10],[106,75,10],[106,74,10],[106,73,10],[106,72,10],[106,71,10],[106,70,10],[106,69,10],[106,68,10],[106,67,10],[106,66,10],[106,65,10],[106,64,10],[106,63,10],[106,62,10],[106,61,10],[106,60,10],[106,59,10],[106,58,10],[106,57,10],[106,56,10],[106,55,10],[106,54,10],[106,48,10],[106,49,10],[106,50,10],[106,51,10],[106,52,10],[106,53,10],[107,52,10],[107,51,10],[107,50,10],[107,53,10],[107,54,10],[107,55,10],[107,56,10],[107,57,10],[107,58,10],[107,59,10],[107,60,10],[107,61,10],[107,62,10],[107,63,10],[107,64,10],[107,65,10],[107,66,10],[107,67,10],[107,68,10],[107,69,10],[107,70,10],[107,72,10],[107,71,10],[107,73,10],[107,74,10],[107,75,10],[107,48,10],[107,49,10],[89,63,10],[90,63,10],[91,63,10],[92,63,10],[93,63,10],[89,64,10],[90,64,10],[91,64,10],[93,64,10],[94,64,10],[95,64,10],[95,63,10],[94,63,10],[92,64,10],[96,64,10],[96,63,10],[97,63,10],[97,64,10],[98,64,10],[99,64,10],[98,63,10],[99,63,10],[100,63,10],[101,63,10],[102,63,10],[101,64,10],[100,64,10],[102,64,10],[103,64,10],[104,64,10],[103,63,10],[105,64,10],[105,63,10],[104,63,10],[16,9,0],[16,8,0],[16,7,0],[17,7,0],[79,60,11],[79,59,11],[79,57,11],[79,56,11],[80,55,11],[80,54,11],[80,56,11],[80,58,11],[80,59,11],[80,60,11],[80,57,11],[79,54,11],[79,55,11],[79,58,11],[81,58,11],[81,55,11],[81,54,11],[81,53,11],[81,56,11],[81,57,11],[81,59,11],[81,60,11],[82,60,11],[82,58,11],[82,56,11],[82,54,11],[82,53,11],[82,55,11],[82,57,11],[82,59,11],[83,58,11],[83,55,11],[83,54,11],[83,53,11],[83,56,11],[83,59,11],[83,60,11],[84,59,11],[83,57,11],[84,55,11],[84,54,11],[84,53,11],[84,56,11],[84,58,11],[84,60,11],[84,57,11],[79,53,11],[80,53,11],[80,52,11],[79,52,11],[79,51,11],[81,51,11],[82,51,11],[80,51,11],[81,52,11],[82,52,11],[83,52,11],[83,51,11],[84,52,11],[84,51,11],[84,50,11],[84,49,11],[81,50,11],[80,50,11],[80,49,11],[79,50,11],[79,49,11],[81,49,11],[82,49,11],[83,49,11],[82,50,11],[83,50,11],[82,48,11],[81,48,11],[80,48,11],[81,47,11],[79,47,11],[79,48,11],[80,47,11],[82,47,11],[83,47,11],[83,48,11],[84,48,11],[84,47,11],[79,67,11],[79,68,11],[79,69,11],[80,69,11],[80,68,11],[80,67,11],[81,68,11],[81,69,11],[82,69,11],[82,68,11],[82,67,11],[81,67,11],[83,69,11],[83,68,11],[83,67,11],[84,69,11],[84,68,11],[84,67,11],[79,70,11],[79,71,11],[79,72,11],[80,71,11],[80,70,11],[80,72,11],[81,71,11],[81,70,11],[81,72,11],[82,72,11],[82,70,11],[82,71,11],[83,71,11],[83,70,11],[83,72,11],[84,71,11],[84,70,11],[84,72,11],[78,67,11],[78,69,11],[78,71,11],[78,72,11],[77,71,11],[77,70,11],[77,68,11],[77,67,11],[77,69,11],[76,70,11],[77,72,11],[77,73,11],[78,70,11],[78,68,11],[76,67,11],[76,68,11],[76,69,11],[76,71,11],[76,72,11],[76,73,11],[78,73,11],[79,73,11],[80,73,11],[81,73,11],[82,73,11],[83,73,11],[84,73,11],[60,68,11],[60,69,11],[60,71,11],[60,72,11],[61,72,11],[61,73,11],[62,73,11],[63,73,11],[64,73,11],[65,73,11],[60,73,11],[60,74,11],[61,74,11],[62,74,11],[63,74,11],[64,74,11],[65,74,11],[67,74,11],[68,74,11],[67,73,11],[62,67,11],[63,67,11],[64,68,11],[65,68,11],[64,69,11],[64,70,11],[63,70,11],[62,71,11],[62,70,11],[62,69,11],[62,68,11],[61,71,11],[62,72,11],[61,70,11],[61,69,11],[61,68,11],[60,70,11],[60,67,11],[61,67,11],[63,68,11],[65,69,11],[63,71,11],[63,72,11],[63,69,11],[64,72,11],[65,71,11],[65,72,11],[65,70,11],[64,71,11],[66,72,11],[66,71,11],[66,73,11],[66,74,11],[66,70,11],[66,69,11],[67,69,11],[67,70,11],[67,72,11],[67,71,11],[68,71,11],[68,73,11],[68,69,11],[68,68,11],[68,67,11],[68,70,11],[68,72,11],[68,66,11],[67,66,11],[66,67,11],[65,67,11],[67,67,11],[64,67,11],[66,66,11],[62,66,11],[61,66,11],[60,66,11],[65,66,11],[64,66,11],[63,66,11],[-3,0,11],[67,68,11],[66,68,11],[52,58,11],[52,59,11],[52,60,11],[52,57,11],[52,56,11],[53,60,11],[53,59,11],[53,58,11],[53,57,11],[53,56,11],[54,57,11],[54,56,11],[54,58,11],[54,59,11],[54,60,11],[59,57,11],[59,59,11],[59,60,11],[60,60,11],[60,59,11],[59,58,11],[60,58,11],[60,57,11],[60,56,11],[61,60,11],[61,59,11],[61,58,11],[61,57,11],[61,56,11],[59,56,11],[-1,4,11],[52,64,11],[52,63,11],[52,61,11],[52,62,11],[53,62,11],[53,61,11],[53,63,11],[53,64,11],[53,65,11],[54,63,11],[54,64,11],[54,65,11],[54,66,11],[54,62,11],[54,61,11],[52,66,11],[53,67,11],[53,66,11],[52,65,11],[52,67,11],[52,68,11],[53,68,11],[54,68,11],[54,67,11],[50,62,0],[50,66,0],[50,68,0],[50,64,0],[48,66,0],[48,64,0],[48,62,0],[48,68,0],[58,67,0],[58,70,0],[59,73,0],[58,71,0],[59,69,0],[59,68,0],[60,76,0],[63,75,0],[62,75,0],[61,75,0],[65,76,0],[68,76,0],[68,75,0],[69,75,0],[69,70,0],[70,69,0],[70,70,0],[70,73,0],[70,74,0],[70,71,0],[70,68,0],[69,67,0],[69,66,0],[69,65,0],[-3,-1,0],[-4,-1,0],[-5,-1,0],[4,1,0],[60,65,0],[65,65,0],[66,65,0],[68,65,0],[74,75,0],[74,74,0],[73,72,0],[74,71,0],[74,67,0],[74,65,0],[77,76,0],[79,76,0],[82,76,0],[83,76,0],[84,75,0],[85,75,0],[87,72,0],[88,69,0],[87,67,0],[97,87,0],[95,74,0],[97,67,0],[94,67,0],[94,69,0],[96,87,0],[102,69,0],[101,74,0],[102,70,0],[102,68,0],[100,68,0],[96,73,0],[92,66,0],[90,66,0],[101,67,0],[99,70,0],[94,73,0],[89,75,0],[97,75,0],[99,75,0],[100,75,0],[92,77,10],[78,65,0],[80,65,0],[84,65,0],[78,62,0],[80,62,0],[82,62,0],[84,62,0],[72,62,0],[52,75,0],[51,76,0],[52,77,0],[52,78,0],[53,78,0],[54,78,0],[54,76,0],[54,73,0],[53,70,0],[52,72,0],[51,73,0],[50,75,0],[49,75,0],[53,81,0],[54,81,0],[58,81,0],[59,82,0],[61,82,0],[63,83,0],[64,82,0],[66,82,0],[64,80,0],[57,80,0],[52,81,0],[50,82,0],[50,83,0],[51,83,0],[57,83,0],[63,84,0],[64,84,0],[67,82,0],[70,81,0],[71,81,0],[76,82,0],[75,83,0],[70,83,0],[65,83,0],[66,83,0],[72,80,0],[75,80,0],[76,80,0],[78,81,0],[79,81,0],[78,83,0],[81,80,0],[82,80,0],[85,81,0],[84,82,0],[81,83,0],[80,83,0],[83,84,0],[87,83,0],[89,82,0],[90,81,0],[93,80,0],[95,80,0],[99,82,0],[96,83,0],[92,83,0],[93,84,0],[96,84,0],[100,84,0],[101,82,0],[102,80,0],[103,81,0],[104,82,0],[106,81,0],[108,81,0],[110,83,0],[107,85,0],[106,85,0],[108,85,0],[111,83,0],[111,80,0],[111,79,0],[109,77,0],[110,75,0],[111,72,0],[112,74,0],[112,77,0],[112,79,0],[109,71,0],[110,67,0],[111,65,0],[111,66,0],[111,70,0],[111,73,0],[110,70,0],[111,64,0],[111,63,0],[111,62,0],[110,62,0],[113,64,0],[113,63,0],[113,58,0],[112,57,0],[110,56,0],[111,56,0],[112,55,0],[109,60,0],[108,61,0],[109,61,0],[110,54,0],[110,53,0],[110,50,0],[111,50,0],[111,52,0],[111,51,0],[110,48,0],[109,47,0],[110,46,0],[111,46,0],[103,49,0],[103,51,0],[103,56,0],[104,57,0],[103,60,0],[90,61,0],[90,57,0],[90,58,0],[86,54,0],[87,54,0],[92,60,1],[92,59,1],[92,58,1],[92,55,1],[92,54,1],[0,-7,1],[0,-8,1],[92,53,1],[92,56,1],[92,57,1],[5,0,1],[6,0,1],[101,60,1],[101,59,1],[101,58,1],[101,57,1],[101,56,1],[101,55,1],[101,54,1],[101,53,1],[101,52,1],[101,51,1],[92,51,1],[92,50,1],[92,49,1],[92,47,1],[92,46,1],[93,46,1],[94,46,1],[96,46,1],[97,46,1],[98,46,1],[99,46,1],[101,49,1],[0,6,1],[101,48,1],[101,46,1],[101,47,1],[100,46,1],[95,46,1],[101,50,1],[92,52,1],[94,50,1],[95,50,1],[94,52,1],[93,52,1],[94,51,1],[94,48,1],[94,47,1],[93,49,1],[95,49,1],[95,47,1],[93,50,1],[93,51,1],[95,48,1],[94,49,1],[3,-2,1],[3,-3,1],[2,-3,1],[2,3,1],[3,2,1],[96,47,1],[96,48,1],[95,51,1],[95,55,1],[97,48,1],[93,53,1],[93,54,1],[93,57,1],[94,58,1],[94,57,1],[94,56,1],[93,56,1],[93,58,1],[93,55,1],[95,56,1],[93,60,1],[94,60,1],[94,59,1],[93,59,1],[99,60,1],[99,59,1],[100,59,1],[99,57,1],[99,58,1],[100,60,1],[100,58,1],[100,56,1],[100,54,1],[100,55,1],[99,56,1],[100,52,1],[100,51,1],[99,55,1],[98,58,1],[98,52,1],[98,50,1],[98,51,1],[98,57,1],[95,57,1],[95,58,1],[94,55,1],[98,54,1],[98,53,1],[98,55,1],[98,56,1],[99,54,1],[99,53,1],[100,57,1],[-1,-4,1],[99,49,1],[99,47,1],[99,48,1],[99,52,1],[99,51,1],[98,48,1],[98,49,1],[97,47,1],[100,50,1],[100,47,1],[100,49,1],[100,48,1],[99,50,1],[100,53,1],[98,47,1],[102,52,4],[102,50,4],[102,49,4],[102,48,4],[102,47,4],[102,46,4],[-1,5,4],[-1,6,4],[-1,7,4],[102,54,4],[102,53,4],[102,51,4],[102,55,4],[102,57,4],[102,58,4],[102,59,4],[102,60,4],[102,56,4],[5,1,4],[6,1,4],[-2,2,4],[-3,2,4],[-4,2,4],[-5,2,4],[-6,2,4],[-7,2,4],[-2,1,4],[-3,1,4],[-4,1,4],[-5,1,4],[94,61,4],[99,61,4],[100,61,4],[101,61,4],[102,61,4],[93,61,4],[92,61,4],[91,61,4],[91,59,4],[91,60,4],[91,58,4],[91,57,4],[91,56,4],[91,55,4],[91,54,4],[91,53,4],[91,52,4],[91,51,4],[91,50,4],[91,49,4],[92,45,4],[91,47,4],[91,46,4],[91,45,4],[94,45,4],[93,45,4],[95,45,4],[96,45,4],[97,45,4],[99,45,4],[100,45,4],[101,45,4],[98,45,4],[2,-2,1],[93,48,12],[-4,0,1],[-4,3,1],[-5,0,1],[-3,3,1],[-2,5,1],[92,48,1],[93,47,1],[66,37,0],[66,36,0],[66,33,0],[66,34,0],[66,31,0],[66,32,0],[66,35,0],[65,30,0],[65,31,0],[65,37,0],[65,38,0],[65,36,0],[65,32,0],[65,33,0],[65,35,0],[65,34,0],[66,38,0],[71,38,0],[71,36,0],[71,33,0],[71,31,0],[71,32,0],[71,34,0],[71,37,0],[72,38,0],[72,35,0],[72,33,0],[72,31,0],[72,32,0],[72,37,0],[72,36,0],[72,34,0],[71,35,0],[72,30,0],[71,30,0],[73,31,0],[74,31,0],[77,31,0],[76,31,0],[73,30,0],[74,30,0],[76,30,0],[77,30,0],[75,30,0],[75,31,0],[63,31,0],[62,31,0],[64,31,0],[61,31,0],[59,30,0],[60,31,0],[63,30,0],[64,30,0],[62,30,0],[60,30,0],[61,30,0],[59,31,0],[58,27,0],[58,29,0],[58,30,0],[58,28,0],[58,25,0],[58,26,0],[57,28,0],[57,30,0],[57,29,0],[58,24,0],[57,25,0],[57,27,0],[57,24,0],[57,26,0],[57,31,0],[58,31,0],[58,22,0],[58,21,0],[58,19,0],[57,19,0],[57,22,0],[57,23,0],[57,21,0],[57,20,0],[58,23,0],[58,20,0],[58,18,0],[57,15,0],[57,16,0],[58,17,0],[58,15,0],[58,14,0],[57,17,0],[57,18,0],[57,14,0],[58,16,0],[58,13,0],[57,13,0],[57,12,0],[6,-1,0],[7,-1,0],[9,-1,0],[10,-1,0],[64,12,0],[65,12,0],[65,11,0],[62,11,0],[60,11,0],[59,11,0],[58,11,0],[63,12,0],[62,12,0],[58,12,0],[59,12,0],[61,12,0],[60,12,0],[61,11,0],[63,11,0],[64,11,0],[57,11,0],[66,11,0],[68,11,0],[69,11,0],[66,12,0],[70,11,0],[67,12,0],[68,12,0],[70,12,0],[67,11,0],[71,11,0],[71,12,0],[72,12,0],[69,12,0],[75,12,0],[76,12,0],[75,11,0],[76,11,0],[72,11,0],[77,11,0],[78,11,0],[77,12,0],[78,12,0],[79,11,0],[79,13,0],[79,14,0],[79,17,0],[79,18,0],[79,19,0],[79,21,0],[78,17,0],[78,14,0],[79,12,0],[78,13,0],[78,18,0],[78,19,0],[78,16,0],[78,15,0],[79,15,0],[79,16,0],[79,22,0],[78,22,0],[78,20,0],[78,23,0],[78,25,0],[78,27,0],[78,24,0],[78,26,0],[78,21,0],[79,20,0],[79,23,0],[79,28,0],[79,27,0],[79,24,0],[79,25,0],[79,29,0],[79,26,0],[78,28,0],[78,31,0],[78,30,0],[78,29,0],[79,30,0],[79,31,0],[65,27,0],[65,28,0],[66,29,0],[66,30,0],[66,27,0],[66,28,0],[65,29,0],[72,26,11],[72,25,11],[75,26,11],[74,25,11],[74,26,11],[73,26,11],[73,25,11],[75,25,11],[76,26,11],[76,25,11],[65,23,11],[65,22,11],[67,22,11],[69,22,11],[71,23,11],[70,23,11],[67,23,11],[66,23,11],[66,24,11],[68,24,11],[67,24,11],[65,24,11],[70,24,11],[71,24,11],[72,24,11],[73,24,11],[74,24,11],[73,23,11],[68,23,11],[69,23,11],[68,22,11],[66,22,11],[66,21,11],[70,22,11],[71,22,11],[70,21,11],[67,21,11],[68,21,11],[69,21,11],[65,21,11],[68,20,11],[65,20,11],[66,20,11],[69,20,11],[71,20,11],[70,20,11],[67,20,11],[71,21,11],[72,21,11],[72,23,11],[73,21,11],[73,22,11],[72,22,11],[74,23,11],[74,22,11],[75,24,11],[75,23,11],[75,22,11],[76,24,11],[76,21,11],[75,21,11],[74,21,11],[74,20,11],[72,20,11],[75,20,11],[73,20,11],[76,22,11],[76,20,11],[63,28,11],[63,26,11],[63,24,11],[63,23,11],[63,22,11],[63,21,11],[63,25,11],[63,27,11],[62,28,11],[61,28,11],[61,27,11],[61,25,11],[61,24,11],[61,22,11],[60,23,11],[60,25,11],[60,27,11],[60,28,11],[60,26,11],[60,24,11],[61,26,11],[62,26,11],[62,23,11],[62,24,11],[62,27,11],[62,25,11],[62,22,11],[61,23,11],[64,23,11],[64,24,11],[64,22,11],[64,21,11],[63,20,11],[64,20,11],[62,20,11],[62,21,11],[61,21,11],[61,20,11],[60,22,11],[60,21,11],[65,15,11],[65,16,11],[65,17,11],[65,18,11],[67,18,11],[68,18,11],[70,18,11],[71,18,11],[73,18,11],[74,18,11],[75,18,11],[76,18,11],[76,17,11],[76,16,11],[76,15,11],[76,14,11],[75,14,11],[74,14,11],[72,14,11],[69,14,11],[67,14,11],[66,14,11],[65,14,11],[67,15,11],[68,15,11],[67,16,11],[66,17,11],[67,17,11],[66,15,11],[66,18,11],[66,16,11],[68,16,11],[69,16,11],[71,15,11],[68,17,11],[70,17,11],[70,16,11],[69,17,11],[71,16,11],[69,18,11],[71,17,11],[70,15,11],[69,15,11],[72,15,11],[70,14,11],[68,14,11],[71,14,11],[73,14,11],[72,17,11],[73,15,11],[73,16,11],[72,18,11],[73,17,11],[72,16,11],[74,16,11],[74,15,11],[75,16,11],[75,17,11],[75,15,11],[74,17,11],[63,13,0],[65,13,0],[66,13,0],[69,13,0],[70,13,0],[72,13,0],[62,13,0],[60,13,0],[59,13,0],[60,16,0],[60,18,0],[62,17,0],[1,-7,0],[1,-8,0],[-2,3,0],[-3,-2,0],[-3,-3,0],[-2,-5,0],[2,4,0],[69,26,0],[69,27,0],[75,29,0],[77,24,0],[77,22,0],[77,21,0],[77,26,0],[77,29,0],[77,19,0],[77,18,0],[76,19,0],[75,19,0],[71,19,0],[70,19,0],[72,19,0],[67,19,0],[66,19,0],[71,26,11],[71,25,11],[76,23,11],[69,24,11],[59,20,0],[59,24,0],[59,25,0],[59,27,0],[59,28,0],[57,9,0],[57,8,0],[57,6,0],[57,5,0],[57,7,0],[57,4,0],[57,3,0],[57,2,0],[58,2,0],[58,1,0],[58,0,0],[57,10,0],[58,4,0],[58,10,0],[58,9,0],[58,5,0],[58,6,0],[58,3,0],[57,1,0],[57,0,0],[58,7,0],[58,8,0],[59,1,0],[62,1,0],[63,1,0],[60,0,0],[61,0,0],[63,0,0],[59,0,0],[61,1,0],[60,1,0],[64,1,0],[65,1,0],[62,0,0],[66,0,0],[67,0,0],[64,0,0],[68,0,0],[65,0,0],[67,1,0],[68,1,0],[66,1,0],[70,1,0],[71,1,0],[69,0,0],[72,0,0],[70,0,0],[69,1,0],[72,1,0],[73,1,0],[71,0,0],[74,0,0],[7,0,0],[9,0,0],[10,0,0],[11,0,0],[61,4,0],[62,4,0],[66,4,0],[67,4,0],[69,4,0],[65,4,0],[60,4,0],[59,4,0],[63,4,0],[64,4,0],[65,3,0],[62,3,0],[60,3,0],[59,3,0],[61,3,0],[63,3,0],[64,3,0],[60,2,0],[63,2,0],[66,2,0],[67,2,0],[59,2,0],[61,2,0],[64,2,0],[65,2,0],[62,2,0],[68,2,0],[69,3,0],[66,3,0],[67,3,0],[71,3,0],[70,3,0],[68,4,0],[70,4,0],[68,3,0],[71,2,0],[72,2,0],[69,2,0],[72,3,0],[71,4,0],[70,2,0],[73,3,0],[72,4,0],[73,0,0],[73,4,0],[74,1,0],[74,3,0],[74,2,0],[73,2,0],[75,2,0],[76,2,0],[75,4,0],[76,4,0],[78,4,0],[79,3,0],[79,0,0],[79,1,0],[79,2,0],[79,-1,0],[79,4,0],[78,0,0],[77,3,0],[77,0,0],[78,3,0],[77,1,0],[78,2,0],[76,3,0],[75,3,0],[75,1,0],[76,1,0],[75,0,0],[76,0,0],[74,4,0],[77,4,0],[77,2,0],[78,1,0],[81,4,0],[83,4,0],[84,4,0],[85,4,0],[82,4,0],[80,3,0],[80,1,0],[80,-1,0],[80,4,0],[80,2,0],[81,2,0],[82,1,0],[81,3,0],[82,3,0],[82,0,0],[83,3,0],[83,0,0],[83,2,0],[83,1,0],[84,3,0],[84,0,0],[84,2,0],[85,0,0],[85,3,0],[85,2,0],[84,1,0],[85,1,0],[82,2,0],[81,1,0],[81,0,0],[80,0,0],[86,2,0],[86,5,0],[86,7,0],[86,8,0],[86,4,0],[86,3,0],[86,6,0],[87,3,0],[87,9,0],[87,2,0],[87,4,0],[87,8,0],[87,7,0],[87,5,0],[87,6,0],[87,10,0],[87,11,0],[86,9,0],[86,12,0],[86,13,0],[86,10,0],[86,14,0],[86,15,0],[86,11,0],[86,16,0],[87,12,0],[87,18,0],[87,13,0],[87,17,0],[87,16,0],[87,14,0],[87,15,0],[86,18,0],[86,17,0],[86,19,0],[87,20,0],[87,21,0],[86,23,0],[86,22,0],[86,24,0],[86,26,0],[86,25,0],[87,25,0],[87,23,0],[87,26,0],[87,22,0],[87,24,0],[86,20,0],[86,21,0],[87,19,0],[87,1,0],[87,0,0],[86,1,0],[86,0,0],[81,14,11],[81,20,11],[81,15,11],[81,12,11],[80,15,11],[81,21,11],[82,18,11],[82,13,11],[82,11,11],[81,19,11],[82,22,11],[82,16,11],[83,14,11],[82,17,11],[83,22,11],[83,20,11],[81,17,11],[82,23,11],[84,14,11],[84,13,11],[84,22,11],[84,20,11],[83,15,11],[84,21,11],[84,19,11],[84,15,11],[83,21,11],[82,24,11],[83,19,11],[84,16,11],[82,25,11],[83,26,11],[84,23,11],[84,24,11],[85,25,11],[82,21,11],[80,25,11],[81,18,11],[80,23,11],[80,21,11],[80,14,11],[81,22,11],[85,17,11],[85,22,11],[85,18,11],[85,14,11],[85,12,11],[85,19,11],[84,18,11],[83,16,11],[84,17,11],[82,19,11],[83,18,11],[82,20,11],[80,18,11],[81,16,11],[81,13,11],[83,13,11],[83,17,11],[82,14,11],[82,15,11],[81,31,0],[83,31,0],[84,31,0],[80,31,0],[81,30,0],[83,30,0],[80,30,0],[82,30,0],[85,30,0],[82,31,0],[85,31,0],[84,30,0],[86,30,0],[87,30,0],[86,31,0],[89,31,0],[88,30,0],[92,30,0],[89,30,0],[91,30,0],[88,31,0],[90,31,0],[91,31,0],[87,31,0],[92,31,0],[93,31,0],[94,31,0],[95,31,0],[96,31,0],[97,31,0],[98,31,0],[99,31,0],[105,31,0],[106,31,0],[107,31,0],[109,31,0],[108,31,0],[110,31,0],[111,31,0],[112,31,0],[114,31,0],[113,31,0],[115,31,0],[116,31,0],[115,30,0],[112,30,0],[114,30,0],[113,30,0],[111,30,0],[109,30,0],[108,30,0],[110,30,0],[106,30,0],[107,30,0],[105,30,0],[98,30,0],[99,30,0],[96,30,0],[97,30,0],[95,30,0],[94,30,0],[93,30,0],[90,30,0],[116,30,0],[116,29,0],[116,25,0],[116,28,0],[115,29,0],[116,26,0],[115,28,0],[115,27,0],[115,25,0],[115,26,0],[116,27,0],[115,20,0],[115,19,0],[115,18,0],[115,21,0],[116,21,0],[116,19,0],[116,17,0],[116,20,0],[117,20,0],[117,16,0],[117,21,0],[117,19,0],[117,17,0],[117,18,0],[115,17,0],[116,18,0],[116,16,0],[116,15,0],[115,14,0],[115,16,0],[116,13,0],[115,15,0],[116,12,0],[117,15,0],[117,14,0],[117,13,0],[117,12,0],[116,14,0],[115,12,0],[115,13,0],[115,11,0],[115,10,0],[116,11,0],[117,11,0],[116,10,0],[117,10,0],[116,9,0],[115,9,0],[116,8,0],[115,8,0],[116,7,0],[114,8,0],[112,8,0],[111,8,0],[113,7,0],[115,7,0],[110,8,0],[114,7,0],[113,8,0],[112,7,0],[111,7,0],[110,7,0],[117,9,0],[117,8,0],[117,7,0],[109,7,0],[108,7,0],[107,8,0],[106,8,0],[106,7,0],[105,8,0],[104,8,0],[103,8,0],[103,7,0],[102,7,0],[101,7,0],[100,7,0],[99,7,0],[98,7,0],[97,7,0],[96,7,0],[98,8,0],[101,8,0],[108,8,0],[109,8,0],[105,7,0],[104,7,0],[107,7,0],[100,8,0],[96,8,0],[99,8,0],[102,8,0],[97,8,0],[95,8,0],[94,8,0],[93,8,0],[92,8,0],[91,8,0],[90,8,0],[89,8,0],[88,8,0],[92,7,0],[88,7,0],[90,7,0],[93,7,0],[94,7,0],[91,7,0],[89,7,0],[95,7,0],[89,28,11],[89,25,11],[89,24,11],[89,27,11],[90,29,11],[92,29,11],[93,29,11],[89,29,11],[91,29,11],[94,29,11],[95,29,11],[96,29,11],[97,29,11],[97,28,11],[97,26,11],[97,24,11],[97,23,11],[95,23,11],[92,24,11],[90,24,11],[90,26,11],[91,24,11],[91,23,11],[89,26,11],[91,26,11],[91,28,11],[90,25,11],[90,27,11],[90,28,11],[91,25,11],[91,27,11],[92,28,11],[92,25,11],[92,26,11],[93,28,11],[93,25,11],[93,22,11],[93,26,11],[92,27,11],[95,24,11],[93,24,11],[93,27,11],[94,26,11],[92,22,11],[90,23,11],[89,23,11],[88,25,11],[88,28,11],[88,29,11],[88,24,11],[88,26,11],[88,27,11],[88,23,11],[88,22,11],[91,22,11],[90,22,11],[89,22,11],[95,25,11],[95,27,11],[95,22,11],[97,22,11],[94,24,11],[95,26,11],[94,27,11],[96,25,11],[96,24,11],[96,28,11],[97,25,11],[97,27,11],[96,26,11],[96,27,11],[96,23,11],[95,28,11],[94,28,11],[94,25,11],[94,23,11],[92,23,11],[93,23,11],[94,22,11],[96,22,11],[98,23,0],[98,27,0],[98,29,0],[98,28,0],[99,24,0],[98,24,0],[98,26,0],[98,21,0],[98,25,0],[98,22,0],[99,25,0],[99,29,0],[99,23,0],[99,28,0],[99,27,0],[99,26,0],[99,22,0],[99,21,0],[89,21,0],[90,21,0],[88,21,0],[89,20,0],[88,20,0],[90,20,0],[95,20,0],[97,20,0],[96,21,0],[95,21,0],[94,21,0],[94,20,0],[96,20,0],[98,20,0],[97,21,0],[99,19,0],[99,17,0],[98,19,0],[98,17,0],[99,15,0],[99,20,0],[98,16,0],[99,18,0],[99,16,0],[98,18,0],[98,15,0],[98,14,0],[99,14,0],[98,9,0],[99,10,0],[99,9,0],[98,10,0],[89,11,11],[89,15,11],[90,12,11],[89,12,11],[89,16,11],[93,13,11],[94,12,11],[88,17,11],[92,16,11],[93,15,11],[88,19,11],[92,19,11],[94,19,11],[91,19,11],[89,19,11],[90,19,11],[93,19,11],[95,19,11],[96,19,11],[97,19,11],[97,18,11],[94,18,11],[91,18,11],[89,18,11],[88,18,11],[92,18,11],[93,18,11],[90,18,11],[95,18,11],[96,18,11],[96,17,11],[90,17,11],[92,17,11],[94,17,11],[95,17,11],[93,17,11],[91,17,11],[89,17,11],[97,17,11],[97,16,11],[91,16,11],[88,16,11],[91,15,11],[94,16,11],[93,16,11],[90,16,11],[95,16,11],[96,16,11],[88,15,11],[90,15,11],[94,15,11],[96,15,11],[95,15,11],[91,14,11],[90,14,11],[88,14,11],[92,14,11],[94,14,11],[90,13,11],[93,14,11],[89,14,11],[92,15,11],[95,14,11],[96,12,11],[96,13,11],[97,15,11],[97,10,11],[97,12,11],[97,13,11],[97,9,11],[97,14,11],[97,11,11],[96,14,11],[96,11,11],[95,13,11],[95,10,11],[92,13,11],[95,11,11],[94,13,11],[95,12,11],[91,13,11],[92,12,11],[93,11,11],[91,12,11],[96,10,11],[94,11,11],[93,12,11],[94,10,11],[92,11,11],[88,13,11],[89,13,11],[88,11,11],[88,10,11],[90,10,11],[88,9,11],[92,10,11],[89,9,11],[94,9,11],[91,9,11],[90,11,11],[93,10,11],[91,11,11],[91,10,11],[88,12,11],[90,9,11],[92,9,11],[89,10,11],[93,9,11],[95,9,11],[96,9,11],[103,20,0],[100,20,0],[106,20,0],[105,20,0],[107,21,0],[103,21,0],[104,21,0],[105,21,0],[100,21,0],[102,21,0],[106,21,0],[102,20,0],[101,21,0],[104,20,0],[101,20,0],[107,20,0],[108,20,0],[109,20,0],[109,21,0],[110,21,0],[108,21,0],[110,20,0],[111,20,0],[111,21,0],[116,23,0],[115,23,0],[115,24,0],[116,24,0],[116,22,0],[115,22,0],[117,23,0],[117,24,0],[117,22,0],[117,25,0],[117,27,0],[117,26,0],[117,29,0],[117,28,0],[117,31,0],[117,30,0],[1,6,0],[99,33,0],[99,34,0],[99,32,0],[99,35,0],[99,37,0],[98,36,0],[98,39,0],[98,38,0],[98,35,0],[98,37,0],[98,33,0],[98,32,0],[98,34,0],[99,36,0],[99,38,0],[99,39,0],[99,40,0],[99,41,0],[98,40,0],[99,42,0],[98,41,0],[98,42,0],[100,41,0],[101,41,0],[104,41,0],[106,41,0],[102,40,0],[100,40,0],[104,40,0],[103,40,0],[101,40,0],[100,39,0],[103,39,0],[104,39,0],[102,39,0],[105,39,0],[101,39,0],[105,40,0],[100,42,0],[103,42,0],[104,42,0],[101,42,0],[105,42,0],[102,42,0],[103,41,0],[105,41,0],[106,42,0],[102,41,0],[107,42,0],[108,42,0],[107,41,0],[110,41,0],[112,41,0],[109,41,0],[108,40,0],[111,41,0],[107,40,0],[109,40,0],[107,39,0],[110,40,0],[106,39,0],[106,40,0],[111,40,0],[109,39,0],[110,39,0],[108,39,0],[114,39,0],[111,39,0],[112,39,0],[113,39,0],[114,40,0],[112,40,0],[113,40,0],[113,41,0],[110,42,0],[109,42,0],[113,42,0],[111,42,0],[114,42,0],[112,42,0],[114,41,0],[108,41,0],[115,40,0],[116,40,0],[115,39,0],[116,39,0],[117,39,0],[118,39,0],[117,40,0],[118,40,0],[116,41,0],[119,41,0],[115,41,0],[118,41,0],[117,41,0],[117,42,0],[116,42,0],[115,42,0],[119,42,0],[120,42,0],[120,41,0],[118,42,0],[121,41,0],[122,40,0],[120,40,0],[120,39,0],[121,39,0],[119,39,0],[119,40,0],[124,39,0],[123,40,0],[123,42,0],[123,41,0],[121,42,0],[122,42,0],[124,41,0],[124,40,0],[121,40,0],[123,39,0],[122,41,0],[122,39,0],[124,42,0],[105,34,0],[105,35,0],[105,33,0],[105,32,0],[109,37,0],[109,35,0],[109,34,0],[109,38,0],[109,36,0],[112,33,0],[112,32,0],[112,35,0],[112,34,0],[115,34,0],[115,37,0],[115,38,0],[115,36,0],[115,35,0],[125,37,0],[125,33,0],[125,32,0],[125,36,0],[125,39,0],[125,40,0],[125,35,0],[125,34,0],[125,38,0],[126,33,0],[126,32,0],[126,38,0],[126,40,0],[126,34,0],[126,36,0],[126,37,0],[126,39,0],[126,35,0],[126,42,0],[125,41,0],[126,41,0],[125,42,0],[125,30,0],[125,26,0],[125,31,0],[126,31,0],[126,27,0],[126,28,0],[126,30,0],[126,26,0],[126,29,0],[125,27,0],[125,29,0],[125,25,0],[125,28,0],[126,25,0],[127,25,0],[129,25,0],[130,25,0],[128,25,0],[128,26,0],[127,26,0],[129,26,0],[118,34,11],[117,33,11],[118,35,11],[120,33,11],[117,35,11],[117,37,11],[119,32,11],[119,31,11],[118,31,11],[119,30,11],[119,28,11],[119,27,11],[119,26,11],[119,25,11],[120,24,11],[121,24,11],[120,27,11],[120,28,11],[120,29,11],[120,30,11],[120,31,11],[120,32,11],[120,34,11],[120,35,11],[120,36,11],[121,37,11],[122,37,11],[122,36,11],[122,33,11],[121,31,11],[121,28,11],[121,27,11],[122,26,11],[121,32,11],[122,34,11],[124,32,11],[123,29,11],[123,32,11],[123,34,11],[124,34,11],[124,33,11],[124,37,11],[124,35,11],[123,36,11],[124,36,11],[122,38,11],[119,38,11],[123,38,11],[121,38,11],[118,38,11],[120,38,11],[117,38,11],[118,37,11],[119,37,11],[116,37,11],[117,36,11],[116,38,11],[118,36,11],[119,36,11],[119,34,11],[119,33,11],[118,32,11],[116,36,11],[118,33,11],[116,35,11],[116,32,11],[117,34,11],[116,33,11],[117,32,11],[116,34,11],[119,35,11],[121,35,11],[121,34,11],[121,36,11],[121,33,11],[122,35,11],[123,35,11],[123,37,11],[124,38,11],[120,37,11],[123,33,11],[123,31,11],[122,32,11],[122,29,11],[122,31,11],[122,30,11],[121,29,11],[118,30,11],[118,29,11],[118,27,11],[119,29,11],[118,28,11],[123,28,11],[124,26,11],[124,31,11],[124,27,11],[124,28,11],[124,30,11],[121,30,11],[123,25,11],[121,25,11],[122,25,11],[118,24,11],[120,23,11],[121,23,11],[123,23,11],[125,24,11],[124,29,11],[123,30,11],[115,32,11],[114,32,11],[114,33,11],[113,33,11],[113,32,11],[113,34,11],[115,33,11],[114,34,11],[113,35,11],[113,37,11],[114,36,11],[113,36,11],[114,35,11],[114,37,11],[114,38,11],[112,37,11],[112,38,11],[111,37,11],[110,37,11],[112,36,11],[110,38,11],[111,38,11],[113,38,11],[111,36,11],[111,34,11],[111,33,11],[111,32,11],[110,36,11],[110,35,11],[111,35,11],[110,34,11],[110,32,11],[108,32,11],[109,32,11],[110,33,11],[107,33,11],[109,33,11],[106,33,11],[107,32,11],[106,32,11],[106,35,11],[106,34,11],[106,36,11],[107,34,11],[107,35,11],[108,33,11],[108,34,11],[108,37,11],[108,36,11],[108,35,11],[107,37,11],[106,37,11],[106,38,11],[107,36,11],[107,38,11],[108,38,11],[101,24,11],[101,27,11],[101,28,11],[104,28,11],[107,27,11],[108,27,11],[110,27,11],[107,23,11],[101,29,11],[102,32,11],[105,27,11],[104,25,11],[102,31,11],[103,29,11],[104,26,11],[104,32,11],[106,26,11],[109,28,11],[104,29,11],[111,28,11],[110,25,11],[103,28,11],[110,28,11],[112,24,11],[110,23,11],[105,23,11],[101,23,11],[103,23,11],[106,22,11],[109,22,11],[110,22,11],[112,22,11],[113,24,11],[113,26,11],[113,29,11],[112,29,11],[106,29,11],[107,29,11],[110,26,11],[102,25,11],[100,26,11],[-2,4,0],[2,5,0],[3,3,0],[2,6,0],[4,2,0],[108,25,0],[108,26,0],[100,29,0],[109,27,0],[112,27,0],[107,22,0],[100,24,0],[100,25,0],[101,30,0],[101,35,0],[100,36,0],[114,24,0],[114,20,0],[101,13,11],[102,10,11],[104,14,11],[100,18,11],[104,17,11],[103,12,11],[103,18,11],[107,16,11],[101,16,11],[105,16,11],[106,16,11],[103,16,11],[104,16,11],[108,16,11],[109,16,11],[106,17,11],[105,17,11],[103,17,11],[105,18,11],[106,18,11],[104,18,11],[107,18,11],[107,17,11],[109,17,11],[108,17,11],[110,17,11],[109,18,11],[108,18,11],[111,18,11],[110,18,11],[113,18,11],[112,19,11],[107,19,11],[104,19,11],[105,19,11],[108,19,11],[103,19,11],[106,19,11],[109,19,11],[110,19,11],[111,19,11],[112,20,11],[113,20,11],[112,21,11],[113,19,11],[113,21,11],[114,19,11],[111,17,11],[111,16,11],[112,16,11],[113,17,11],[112,17,11],[112,18,11],[110,16,11],[103,15,0],[111,13,0],[109,10,0],[103,11,0],[109,12,0],[109,15,0],[101,15,0],[102,19,0],[114,16,0],[113,11,0],[80,36,0],[88,35,0],[93,36,0],[81,40,0],[85,41,0],[92,39,0],[81,34,0],[75,35,0],[79,36,0],[97,51,9],[97,50,9],[96,51,9],[96,54,9],[96,49,9],[97,52,9],[97,54,9],[96,50,9],[97,53,9],[97,49,9],[97,55,9],[97,57,9],[96,55,9],[96,58,9],[96,56,9],[96,57,9],[96,59,9],[97,56,9],[96,61,9],[96,60,9],[97,60,9],[97,58,9],[97,61,9],[97,59,9],[96,53,9],[96,52,9],[95,52,1],[94,54,1],[95,53,1],[95,54,1],[94,53,1],[95,59,1],[95,60,1],[95,61,1],[98,59,1],[98,60,1],[98,61,1],[91,48,4]]

function updateViewport() {
  const scrollLeft = viewport.scrollLeft;
  const scrollTop = viewport.scrollTop;

  startTileX = Math.floor(scrollLeft / tileSize);
  startTileY = Math.floor(scrollTop / tileSize);

  const endTileX = startTileX + numVisibleTilesX;
  const endTileY = startTileY + numVisibleTilesY;

  // Usuń poprzednie kafelki spoza widoku
  const visibleTiles = document.querySelectorAll('.tile, .tile3, .tile4, .tile5, .dywan, .grasstile, .tile6, .tile7, .tile-1 ');
  for (let i = 0; i < visibleTiles.length; i++) {
    const tile = visibleTiles[i];
    const { x, y } = tile.dataset;
    if (x < startTileX || x >= endTileX || y < startTileY || y >= endTileY) {
      tile.remove();
      
    }
  }


for (let x = startTileX; x < endTileX; x++) {
  for (let y = startTileY; y < endTileY; y++) {
    const tileKey = `${x}-${y}`;

    if (!tileCache[tileKey] || !tileCache[tileKey].generated) {
      const tileCoords = [x * 1, y * 1];
      const tile = document.createElement('div');
      
      // Znajdź typ kafelka w tileMap dla danej współrzędnej (x, y)
      const tileType = tileMap.find(coords => coords[0] === tileCoords[0] && coords[1] === tileCoords[1]);

      if (tileType) {
        if (tileType[2] === 0) {
          tile.className = 'tile c'; // 
          
        } else if (tileType[2] === 1) {
          tile.className = 'tile7'; // 
        } else if (tileType[2] === 10) {
          tile.className = 'tile5'; // 
        } else if (tileType[2] === 11) {
          tile.className = 'grasstile g'; // trawa
        }else if (tileType[2] === 4) {
          tile.className = 'tile6 c'; // brick
        }else if (tileType[2] === 1) {
          tile.className = 'tile7'; // 
        }else if (tileType[2] === 9) {
          tile.className = 'dywan'; // 
        }else if (tileType[2] === 8) {
          tile.className = 'dywan'; // 
         //lewa cześć telewizora
        }else if (tileType[2] === 7) {
          tile.className = 'dywan'; // 
          //prawa cześć telewizora
        }else if (tileType[2] === 6) {
          tile.className = 'dywan'; // 
          //luzko
        }else if (tileType[2] === 5) {
          tile.className = 'dywan'; // 
          //drzwi
        }else if (tileType[2] === 12) {
          tile.className = 'tile-1'; // 
          //drzwi
        }
        

      } else {
    //    tile.className = 'tile2'; // Pusty kafelek
      }
      tile.dataset.x = x;
      tile.dataset.y = y;
      tile.style.left = x * tileSize + 'px';
      tile.style.top = y * tileSize + 'px';

      content.appendChild(tile);
     /* tileCache[tileKey] = {
        element: tile,
        generated: true,
      };*/
    } else {
      // content.appendChild(tileCache[tileKey].element);
    }
  }
}
}

// Obsługa zdar



// Inicjalizacja
updateViewport();