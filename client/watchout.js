//Static variables
var static = {
  windowX: window.innerWidth - 100,
  windowY: window.innerHeight - 100,
  enemyNum: 10,
  enemyRadius: 10,
  enemyColor: '#00F',
  enemyDuration: 2000,
};


//Randomize
var rand = function(n) {
  return Math.floor(Math.random() * n);
};
var randX = function() { return rand(static.windowX); };
var randY = function() { return rand(static.windowY); };

//Create a board
var board = d3.select('.board').append('svg')
              .attr('width', static.windowX)
              .attr('height', static.windowY);

//Create some enemies
var enemies = board.selectAll('circle')
                    .data(d3.range(static.enemyNum)) //data to bind
                    .enter() //create placeholder
                    .append('circle') //append each circle to svg
                    .attr('class', 'enemy') //enemy class
                    .attr('cx', randX ) //random X position
                    .attr('cy', randY ) //random Y position
                    .attr('r', static.enemyRadius) //radius
                    .attr('fill', static.enemyColor); //color

//Make enemies move
var moveEnemy = function(enemy) {
  enemy.transition()
          .duration(static.enemyDuration)
          .attr("cx", randX)
          .attr("cy", randY)
          .each('end', function(){ moveEnemy(d3.select(this))});
};
moveEnemy(enemies);