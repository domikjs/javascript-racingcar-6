import { MissionUtils } from '@woowacourse/mission-utils';
import { RACING_GAME_MESSAGE } from '../constants/index.js';

export default class RacingGame {
  cars = [];
  gameCount = 0;

  constructor() {}
  async readCarNames() {
    const input = await MissionUtils.Console.readLineAsync(
      RACING_GAME_MESSAGE.READ_CAR_NAMES + '\n'
    );
    //validate inputs
    const carNames = input.split(',');
    carNames.forEach((carName) => {
      const car = new Car(carName);
      this.cars.push(car);
    });

    return carNames;
  }
  async readGameCount() {
    const gameCount = await MissionUtils.Console.readLineAsync(
      RACING_GAME_MESSAGE.READ_GAME_COUNT + '\n'
    );
    // validate input
    this.gameCount = gameCount;
    return gameCount;
  }

  playOneTurn() {
    this.cars.forEach((car) => {
      car.play();
    });
  }

  printRacingStatus() {
    this.cars.forEach((car) => {
      car.printStatus();
    });
  }
  getWinners() {
    let winners = [];
    let highestMoveCount = 0;

    for (const car of this.cars) {
      if (car.moveCount > highestMoveCount) {
        highestMoveCount = car.moveCount;
        winners = [car];
      } else if (car.moveCount === highestMoveCount) {
        winners.push(car);
      }
    }
    return winners;
  }
  printWinner() {
    const winnerNames = this.getWinners().map((winner) => winner.name);
    console.log(`최종 우승자 : ${winnerNames.join(',')}`);
  }

  async play() {
    await this.readCarNames();
    await this.readGameCount();
    console.log('');
    console.log('실행 결과');
    for (let i = 0; i < this.gameCount; i++) {
      await this.playOneTurn();
      await this.printRacingStatus();
      console.log('');
    }
    this.printWinner();
  }
}

class Car {
  name;
  moveCount = 0;

  constructor(name) {
    this.name = name;
  }

  play() {
    const number = MissionUtils.Random.pickNumberInRange(0, 9);
    if (number >= 4) {
      this.moveCount++;
    }
  }

  printStatus() {
    console.log(`${this.name} : ${this.getMoveLog()}`);
  }

  getMoveLog() {
    let moveLog = '';
    for (let i = 0; i < this.moveCount; i++) {
      moveLog += '-';
    }
    return moveLog;
  }
}
