<template>
  <div class="grid-cell" :class="classNames" :style="cellImageStyle" />
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { isSnake, isSnack,getSnakeCoordinate } from "@/utils/index";

export default {
  props: {
    coordinateY: {
      type: Number,
      required: true,
    },
    coordinateX: {
      type: Number,
      required: true,
    },
    coordinateType: {
      type: String,
      required: false,
    },
    gridSize: {
      type: Number,
      required: true,
    },
    isWallCell: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props) {
    const store = useStore();
    const snake = computed(() => store.state.snake);
    const snack = computed(() => store.state.snack);
    const isGameOver = computed(() => store.state.playground.isGameOver);

    const classNames = computed(() => ({
      "grid-cell-snake-head": snake.value?.coordinates
        ? isSnake(
            [snake.value.coordinates[0]],
            props.coordinateX,
            props.coordinateY
          )
        : false,
      "grid-cell-snake": snake.value?.coordinates
        ? isSnake(snake.value.coordinates, props.coordinateX, props.coordinateY)
        : false,
      "grid-cell-snack": snack.value?.coordinate
        ? isSnack(props.coordinateX, props.coordinateY,props.coordinateType, snack.value)
        : false,
      "grid-cell-game-over": isGameOver.value,
      "grid-cell-wall": props.isWallCell,
    }));
    const cellImageStyle = computed(() => {
      let isSnackCell = snack.value?.coordinate ? isSnack(props.coordinateX, props.coordinateY,snack.value):false
      let isSnakeCell = snake.value?.coordinates ? isSnake(snake.value.coordinates, props.coordinateX, props.coordinateY):false
      if (isSnackCell){
        return "background-image: url(\"/snake-vue3/src/assets/"+snack.value.coordinate.type+"\")"
      }else if(isSnakeCell){
        let snakeCell = getSnakeCoordinate(snake.value.coordinates, props.coordinateX, props.coordinateY)
        // console.log(snakeCell,snake.value.coordinates)
        return "background-image: url(\"/src/assets/"+snakeCell.type+"\")"
      }
     return ""

    });
    return {
      classNames,cellImageStyle
    };
  },
};
</script>

<style>
.grid-cell {
  border-top: 1px solid #363636;
  width: 50px;
  height: 50px;
  position: relative;
}

.grid-cell:not(:first-child) {
  border-left: 1px solid #363636;
}

.grid-cell-wall:not(.grid-cell-snake.grid-cell-game-over.grid-cell-snake-head) {
  background-color: #00d9ff;
}

.grid-cell-snake-head:not(.grid-cell-game-over) {
  //background-color: #15ff00 !important;
  //background-image: url("/src/assets/snake-head.png") !important;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.grid-cell-snake:not(.grid-cell-game-over) {
  //background-color: #086600;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.grid-cell-snake.grid-cell-game-over.grid-cell-snake-head {
  background-color: rgba(255, 0, 0, 0) !important;
  z-index: 9999;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.grid-cell-snake.grid-cell-game-over {
  background-color: rgba(255, 0, 0, 0) !important;
  z-index: 9999;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.grid-cell-snack {
  //background-color: #d87bf0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
