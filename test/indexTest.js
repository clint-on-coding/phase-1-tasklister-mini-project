const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const { expect } = require("chai");

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
const jsPath = path.resolve(__dirname, "../src/index.js");
const jsContent = fs.readFileSync(jsPath, "utf8");

describe("Handling form submission", () => {
  let dom, document, window;

  beforeEach((done) => {
    dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true,
    });

    window = dom.window;
    document = window.document;

    // Inject the JS manually
    const scriptEl = document.createElement("script");
    scriptEl.textContent = jsContent;
    document.body.appendChild(scriptEl);

    // Wait a tick for the DOMContentLoaded + JS to initialize
    setTimeout(() => {
      done();
    }, 50);
  });

  it("should add an event to the form and add input to webpage", (done) => {
    const input = document.getElementById("guest-name");
    const form = document.getElementById("guest-form");

    expect(input).to.not.be.null;
    expect(form).to.not.be.null;

    input.value = "Wash the dishes";

    form.dispatchEvent(new window.Event("submit", { bubbles: true }));

    setTimeout(() => {
      const listItems = document.querySelectorAll("li");
      expect(listItems.length).to.equal(1);
      expect(listItems[0].textContent).to.include("Wash the dishes");
      done();
    }, 50);
  });
});
