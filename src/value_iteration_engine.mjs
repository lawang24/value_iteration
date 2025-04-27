/**
 * Core Value Iteration for a 10×10 grid world.
 * Translated from David Poole’s Java VIcore.java.
 */
export class VIcore {
    constructor() {
      this.WIDTH = 10;
      this.HEIGHT = 10;
      this.NUM_ACTIONS = 4;
  
      // values[x][y] = V(x,y)
      this.values = Array.from({ length: this.WIDTH },
        () => Array(this.HEIGHT).fill(0));
  
      // qvalues[x][y][a] = Q(x,y,a)
      this.qvalues = Array.from({ length: this.WIDTH },
        () => Array.from({ length: this.HEIGHT },
          () => Array(this.NUM_ACTIONS).fill(0)));
  
      this.discount = 0.9;
      this.absorbing = false;
    }
  
    /**
     * Perform one sweep of value iteration.
     * @param {number} newDiscount  the discount factor to use this step
     */
    dostep() {
      const newValues = Array.from({ length: this.WIDTH },
        () => Array(this.HEIGHT).fill(0));
  
      for (let x = 0; x < this.WIDTH; x++) {
        for (let y = 0; y < this.HEIGHT; y++) {
          // compute all Qs, pick max
          let best = this.q(x, y, 0);
          this.qvalues[x][y][0] = best;
  
          for (let a = 1; a < this.NUM_ACTIONS; a++) {
            const qv = this.q(x, y, a);
            this.qvalues[x][y][a] = qv;
            if (qv > best) best = qv;
          }
  
          newValues[x][y] = best;
        }
      }
  
      this.values = newValues;
    }
  
    /**
     * Compute Q-value at (x,y) taking action a, using last-step values.
     * @param {number} x
     * @param {number} y
     * @param {number} action  in [0..3]
     * @returns {number}
     */
    q(x, y, action) {

      // two positive states with terminal rewards
      if (x === 8 && y === 7) {
        return this.absorbing
          ? 10.0
          : 10.0 + this.discount * 0.25 * (
              this.values[0][0] +
              this.values[0][9] +
              this.values[9][0] +
              this.values[9][9]
            );
      }
      if (x === 7 && y === 2) {
        return this.absorbing
          ? 3.0
          : 3.0 + this.discount * 0.25 * (
              this.values[0][0] +
              this.values[0][9] +
              this.values[9][0] +
              this.values[9][9]
            );
      }
  
      // “ordinary” state
      let qval = 0.0;
      for (let dir = 0; dir < this.NUM_ACTIONS; dir++) {
        const contrib = this.contribution(x, y, dir);
        // 0.7 if dir===action else 0.1
        qval += (dir === action ? 0.7 : 0.1) * contrib;
      }
  
      // negative rewardstates
      if (x === 3 && y === 4) {
        qval += -5.0;
      } else if (x === 3 && y === 7) {
        qval += -10.0;
      }
  
      return qval;
    }
  
    /**
     * Contribution to Q-value if the agent actually moves in direction dir.
     * 0=up, 1=right, 2=down, 3=left
     */
    contribution(x, y, dir) {
      switch (dir) {
        case 0: // up
          if (y === 0) return -1 + this.discount * this.values[x][y];
          return this.discount * this.values[x][y - 1];
        case 1: // right
          if (x === this.WIDTH - 1) return -1 + this.discount * this.values[x][y];
          return this.discount * this.values[x + 1][y];
        case 2: // down
          if (y === this.HEIGHT - 1) return -1 + this.discount * this.values[x][y];
          return this.discount * this.values[x][y + 1];
        case 3: // left
          if (x === 0) return -1 + this.discount * this.values[x][y];
          return this.discount * this.values[x - 1][y];
        default:
          return 0;
      }
    }
  
    /**
     * Initialize all values and Q-values to initVal.
     * @param {number} initVal
     */
    doreset(initVal) {
      for (let x = 0; x < this.WIDTH; x++) {
        for (let y = 0; y < this.HEIGHT; y++) {
          this.values[x][y] = initVal;
          for (let a = 0; a < this.NUM_ACTIONS; a++) {
            this.qvalues[x][y][a] = initVal;
          }
        }
      }
    }
  }

  
 
  