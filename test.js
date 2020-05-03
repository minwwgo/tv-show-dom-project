class RunningTotal {
  constructor() {
    this.currentTotal = 0;
  }

  add(n) {
    // Implement this method
    this.currentTotal +=n
  }
  getTotal() {
    // Implement this method
  }
}

const runningTotal = new RunningTotal();

runningTotal.add(3);
runningTotal.add(7);
runningTotal.add(7);
runningTotal.getTotal();