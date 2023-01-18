import { Piece, Direction } from "../types";
import {
  toScreenPosition,
  getEdgePosition,
  toGamePosition,
  getRescaledDirection,
} from "../utils";
import { StraightOverlay } from "./Overlay";

// compute affordances for current moving piece
export default function DirectionOverlays({
  piece,
  pieces,
  directions,
}: {
  piece: Piece;
  pieces: Piece[];
  directions: Direction[];
}) {
  let overlays = [];
  for (let [i, direction] of directions.entries()) {
    // let's compute the overlay from a static position instead.
    let pastPosition = toScreenPosition({
      x: piece.x,
      y: piece.y,
    });

    let edgePosition = getEdgePosition(
      piece,
      toGamePosition(pastPosition),
      direction,
      pieces
    );

    if (!!edgePosition) {
      overlays.push(
        <StraightOverlay key={i}
          start={pastPosition}
          end={toScreenPosition(edgePosition)}
          color="rgb(0,255,0)"
        />
      );
    } else {
      let g = toGamePosition(pastPosition);
      direction = getRescaledDirection(g, direction);
      overlays.push(
        <StraightOverlay key={i}
          start={pastPosition}
          end={toScreenPosition({
            x: g.x + direction.dx,
            y: g.y + direction.dy,
          })}
          color="rgb(0,255,0)"
        />
      );
    }
  }
  return <>{overlays}</>;
}
