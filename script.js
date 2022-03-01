const player = {
  rock: 0,
  rps: 0,
  clickPower: 1,
  tools: {
    spade: 0,
    hatchet: 0,
    pickaxe: 0
  },
  rockTransaction(amount = 0, type = "spend") {
  
    if (type === "spend") {
      this.rock -= amount;
      this.calcRPS(); 
    }
    if (type === "mine") this.rock += amount;

   
    
    document.querySelector("#rock").textContent = this.rock;
  },
  calcRPS() {
 
    this.rps = Object.keys(this.tools).reduce(
      (acc, toolName) => acc + this.tools[toolName] * shop.items[toolName].rps,
      0
    );
    document.querySelector("#rps").textContent = this.rps;
  }
};

const shop = {
 
  items: {
    spade: { baseCost: 10, multiplier: 1.2, rps: 1 },
    hatchet: { baseCost: 50, multiplier: 1.5, rps: 10 },
    pickaxe: { baseCost: 250, multiplier: 1.7, rps: 25 }
  },

  buy(itemName) {
   
    const item = this.items[itemName];

    if (player.rock < (item.currentCost ?? item.baseCost)) return;

   
    player.rockTransaction(item.currentCost ?? item.baseCost, "spend");
    document.querySelector(
      `[data-item=${itemName}] .inventory`
    ).textContent = ++player.tools[itemName];
    player.calcRPS();

    
    item.currentCost = Math.round(
      item.baseCost * player.tools[itemName] * item.multiplier
    );
    document.querySelector(`[data-item=${itemName}] .cost`).textContent =
      item.currentCost;
  }
};

document.querySelector("aside").addEventListener("click", (e) => {
 
  if (!e.target.matches(".toolCard > button")) return;

 
  shop.buy(e.target.parentElement.dataset.item);
});
document.querySelector("main > img").addEventListener("click", (e) => {
  player.rockTransaction(player.clickPower, "mine");
});
setInterval(() => {
  if (player.rps === 0) return; 
  player.rockTransaction(player.rps, "mine");
}, 1000);
