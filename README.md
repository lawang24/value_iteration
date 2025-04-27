# Grid World Value Iteration

[![License: GPL](https://img.shields.io/badge/license-GPL-blue.svg)](LICENSE)
[![Demo](https://img.shields.io/badge/Demo-Available-brightgreen)](#demo)

A refactored and modernized version of [David Poole's original value iteration demo](https://www.cs.ubc.ca/~poole/demos/mdp/vi.html).

---

## 📜 Overview

This applet demonstrates **value iteration** on a simple 10×10 grid world.

- **Actions:** Up, down, left, right
- **Movement:**
  - 70% chance to move in the intended direction
  - 10% chance to move in a random direction
- **Walls:** Bumping into a wall gives a **-1 reward** and prevents movement.

### Rewards

| Position (x, y) | Reward |
|:---------------:|:------:|
| (9, 8)           | +10    |
| (8, 3)           | +3     |
| (4, 5)           | -5     |
| (4, 8)           | -10    |

Rewards are received **when taking an action from** these states (not upon entering).

---

## 🎮 Features

- **Absorbing states mode:**
  - Positive reward states become terminal after being reached.
- **Non-absorbing behavior:**
  - After reaching a positive reward, the agent is teleported randomly to a corner.

---

## ⚙️ Discount Rate

- Starts at **0.9**, adjustable manually or by ±0.1 increments.
- Try values like **0.6, 0.7, 0.8, 0.9, 0.99, 0.995, 1.0** to explore different policy behaviors.

---

## 🧠 Things to Explore

- **Policy Evolution:**  
  Watch how the optimal policy updates as the value function improves.
- **Discount Rate Impact:**  
  Observe changes near the +3 reward and in mid-grid regions (2–3 across, 6–7 down).

---

## 🚀 Demo

> Press **"Step"** to begin value iteration and visualize value and policy evolution.

---

## 📄 License

This project is licensed under the **GNU General Public License (GPL)**, consistent with the license of the original [Grid World Value Iteration Demo](https://www.cs.ubc.ca/~poole/demos/mdp/vi.html) by David Poole.
