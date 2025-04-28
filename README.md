# Grid World Value Iteration

[![License: GPL](https://img.shields.io/badge/license-GPL-blue.svg)](LICENSE)
[![Demo](https://img.shields.io/badge/Demo-Available-brightgreen)](#demo)

### 🚀 [Demo Link](https://lawang24.github.io/value_iteration_demo/)

A refactored and modernized version of [David Poole's original value iteration demo](https://www.cs.ubc.ca/~poole/demos/mdp/vi.html).



## 📜 Overview

This applet demonstrates **value iteration** on a simple 10×10 grid world.

- **Actions:** Up, down, left, right
- **Movement:**
  - 70% chance to move in the intended direction
  - 30% chance to move in a random other direction
- **Walls:** Bumping into a wall gives a **-1 reward** and prevents movement.

### Reward Positions

| Position (x, y) | Reward |
|:---------------:|:------:|
| (9, 8)           | +10    |
| (8, 3)           | +3     |
| (4, 5)           | -5     |
| (4, 8)           | -10    |

Rewards are received **when taking an action from** these states (not upon entering).

## Options

### Steps

- **Step:** One step of value iteration. 
The value iteration equation is defined as:
$$
V(s) \leftarrow \max_{a} \sum_{s'} P(s' \mid s, a) \left( R(s, a, s') + \gamma V(s') \right)
$$ 
This will converge to the value under the optimal policy after sufficient runs. 

- **Reset**: Sets all values back to the initial value of zero.


###  Absorbing State Toggle

- **Absorbing states mode:** Positive reward states become terminal after being reached.

- **Non-absorbing behavior:** After reaching a positive reward, the agent is teleported randomly to a corner.

### Discount Rate

- Starts at **0.9**, adjustable manually or by ±0.1 increments.
- Try values like **0.6, 0.7, 0.8, 0.9, 0.99, 0.995, 1.0** to explore different policy behaviors.

### Fast-Forward Steps

- Automatically set and run any number of value iteration steps 
- Can explore the different converges of value iterations



> Press **"Step"** to begin value iteration and visualize value and policy evolution.

---

## 📄 License

This project is licensed under the **GNU General Public License (GPL)**, consistent with the license of the original [Grid World Value Iteration Demo](https://www.cs.ubc.ca/~poole/demos/mdp/vi.html) by David Poole.
