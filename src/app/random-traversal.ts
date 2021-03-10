const N = 1 << 0;
const S = 1 << 1;
const W = 1 << 2;
const E = 1 << 3;

export class RandomTraversal {
  generateMaze(cellWidth: number, cellHeight: number) {
    var cells = new Array(cellWidth * cellHeight);
    var frontier: Edge[] = [];
    var startIndex = (cellHeight - 1) * cellWidth;

    // start in the SW corner
    cells[startIndex] = 0;

    // go N and E
    frontier.push({ index: startIndex, direction: N });
    frontier.push({ index: startIndex, direction: E });

    var edge = this.popRandom(frontier);

    while (edge != null) {
      var i0 = edge.index;
      var d0 = edge.direction;
      // TODO: make readable with switch statement
      var i1 =
        i0 +
        (d0 === N ? -cellWidth : d0 === S ? cellWidth : d0 === W ? -1 : +1);
      var x0 = i0 % cellWidth;
      var y0 = (i0 / cellWidth) | 0;
      var x1: number;
      var y1: number;
      var d1: number;

      // next cell in direction d0 is not yet part of the maze
      var open = cells[i1] == null;

      if (d0 === N) {
        x1 = x0;
        y1 = y0 - 1;
        d1 = S;
      } else if (d0 === S) {
        x1 = x0;
        y1 = y0 + 1;
        d1 = N;
      } else if (d0 === W) {
        x1 = x0 - 1;
        y1 = y0;
        d1 = E;
      } else {
        x1 = x0 + 1;
        y1 = y0;
        d1 = W;
      }

      if (open) {
        cells[i0] |= d0;
        cells[i1] |= d1;
        if (y1 > 0 && cells[i1 - cellWidth] == null)
          frontier.push({ index: i1, direction: N });
        if (y1 < cellHeight - 1 && cells[i1 + cellWidth] == null)
          frontier.push({ index: i1, direction: S });
        if (x1 > 0 && cells[i1 - 1] == null)
          frontier.push({ index: i1, direction: W });
        if (x1 < cellWidth - 1 && cells[i1 + 1] == null)
          frontier.push({ index: i1, direction: E });
      }
    }
    return cells;
  }

  popRandom(array: Edge[]) {
    if (!array.length) {
      return;
    }
    var n = array.length;
    // truncate any decimals off the random number
    var i = (Math.random() * n) | 0;

    var temp: Edge;
    temp = array[i];
    array[i] = array[n - 1];
    array[n - 1] = temp;
    return array.pop();
  }
}

export class Edge {
  public index: number;
  public direction: number;
}
