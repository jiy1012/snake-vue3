import { Direction } from "@/store/enums";
import { ICoordinate } from "@/store/interfaces";

function isPosition(
  x: number,
  y: number,
  diffX: number,
  diffY: number
): boolean {
  return x === diffX && y === diffY;
}

function areSameCoordinates(
  coordinates_a: ICoordinate,
  coordinates_b
): boolean {
  return isPosition(
    coordinates_a.x,
    coordinates_a.y,
    coordinates_b.x,
    coordinates_b.y
  );
}

function isSnake(snakeCoordinates, x, y): boolean {
  if (!snakeCoordinates.length) return false;

  return (
    snakeCoordinates.filter((coord) => isPosition(coord.x, coord.y, x, y))
      .length > 0
  );
}

function getSnakeCoordinate(snakeCoordinates, x, y) :ICoordinate {
  if (!snakeCoordinates.length) return false;
  return snakeCoordinates.find((coord) => isPosition(coord.x, coord.y, x, y));
}

function isSnack(x, y, snack): boolean {
  if (snack == undefined){
    return false;
  }
  return isPosition(x, y, snack.coordinate.x, snack.coordinate.y);
}

function areOppositeDirections(direction_a: Direction, direction_b: Direction) {
  return (
    (direction_a === Direction.UP && direction_b === Direction.DOWN) ||
    (direction_a === Direction.DOWN && direction_b === Direction.UP) ||
    (direction_a === Direction.LEFT && direction_b === Direction.RIGHT) ||
    (direction_a === Direction.RIGHT && direction_b === Direction.LEFT)
  );
}
function shiftCoordinateTypes(snakeTail) {
  // 如果数组为空或只有一个元素，直接返回原数组
  if (snakeTail.length <= 1) {
    return snakeTail;
  }
  // 创建一个新数组来存储修改后的坐标
  const shiftedSnakeTail = [...snakeTail];
  // 从第二个元素开始遍历数组
  for (let i = 1; i < shiftedSnakeTail.length; i++) {
    // 将当前元素的type设置为前一个元素的type
    shiftedSnakeTail[i - 1].type = shiftedSnakeTail[i].type;
  }
  // 注意：如果数组最后一个元素的type是重要的，并且不应该被丢失，
  // 你需要考虑在循环之外单独处理它，或者重新设计你的逻辑。
  // 在这个实现中，最后一个元素的type将不会被复制到任何其他地方。

  return shiftedSnakeTail;
}
export { areSameCoordinates, isSnake, isSnack, areOppositeDirections,getSnakeCoordinate,shiftCoordinateTypes };
