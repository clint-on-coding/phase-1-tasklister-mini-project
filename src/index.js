document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guest-form");
  const input = document.getElementById("guest-name");
  const guestList = document.getElementById("guest-list");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const guestName = input.value.trim();
    if (guestName === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = guestName;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    const rsvpBtn = document.createElement("button");
    rsvpBtn.textContent = "Attending";
    rsvpBtn.style.marginLeft = "10px";
    rsvpBtn.dataset.attending = "true";

    rsvpBtn.addEventListener("click", () => {
      if (rsvpBtn.dataset.attending === "true") {
        rsvpBtn.textContent = "Not Attending";
        rsvpBtn.style.backgroundColor = "#f66";
        rsvpBtn.dataset.attending = "false";
      } else {
        rsvpBtn.textContent = "Attending";
        rsvpBtn.style.backgroundColor = "#6f6";
        rsvpBtn.dataset.attending = "true";
      }
    });

    li.append(span, deleteBtn, rsvpBtn);
    guestList.appendChild(li);

    input.value = "";
  });
});

