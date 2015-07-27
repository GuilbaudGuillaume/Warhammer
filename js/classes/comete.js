var randX;
var randY;
var pX;
var PY;
var comete = My.Class( {
	constructor: function(ge, ) {
		this.ge = ge;
		this.image = ge.game.add.sprite(0, 0, 'comete');
		this.image.width = TILE_WIDTH;
		this.image.height = TILE_HEIGHT;
		this.pointDeVie = 1;

		position = function() {
			randX = Math.random() * (1300 - 0) + 0;
			pX = Math.floor((randX+20)/40)*40;
			this.image.x = Math
		}
	}
});