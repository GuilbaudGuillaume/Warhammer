function Tileset() {
    this.image = new Image();
    this.image.referenceDuTileset = this.image;
    this.image.onload = function () {
        if(!this.complete) { 
            throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
        }
    }
    Tileset.prototype.dessinerTuile = function(numero, ctx, xDestination, yDestination) {
    this.image.src = "js/tileset/tileset.png";
    this.image.largeur = this.image.width /32;
    var xSourceEnTiles = numero % this.image.largeur;
    if(xSourceEnTiles == 0) { 
        xSourceEnTiles = this.image.largeur;
    }
    var ySourceEnTiles = Math.ceil(numero / this.image.largeur);
    var xSource = (xSourceEnTiles - 1) * 32;
    var ySource = (ySourceEnTiles - 1) * 32;
        ctx.drawImage(this.image, xSource, ySource, 32, 32, xDestination, yDestination, 32, 32);
    }
}
var tuile = new Tileset("tileset.png");