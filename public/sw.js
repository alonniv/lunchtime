const checkedFor = new Set();
self.addEventListener("periodicsync", (event) => {
  console.log(event);
  if (!event.tag === "lunchtime-check") return;
  const date = new Date();
  const key = [date.getFullYear(), date.getMonth(), date.getDate()]
    .map((x) => x.toString())
    .join("-");
  console.log(key);
  if (checkedFor.has(key)) return;
  if (date.getHours() === 9) {
    checkedFor.add(key);
    self.registration.showNotification("Lunchtime!", {
      body: "You should be leaving for lunch by now...",
    });
  }
});
