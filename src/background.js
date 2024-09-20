function injectedFunction() {
  const kebabize = (str) => {
    return str
      .split("")
      .map((letter, idx) => {
        return letter.toUpperCase() === letter
          ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
          : letter;
      })
      .join("");
  };

  const bgColor = "rgba(222,0,255, 1)";
  const color1 = "rgba(222,0,255,0.7)";
  const color2 = "rgba(222,0,255,0.6)";
  const color3 = "rgba(222,0,255,0.35)";
  const color4 = "rgba(222,0,255,0.25)";
  const color5 = "rgba(222,0,255,0.15)";

  const addDebugDecoration = (
    query,
    domElements,
    color,
    displayLabel,
    fullHorizontal
  ) => {
    let target,
      parentElement,
      style,
      position,
      label,
      text,
      line,
      overlay,
      updatePosition,
      isVisible;

    for (let i = 0; i < domElements.length; i++) {
      target = domElements[i];
      updatePosition = false;
      isVisible = target.classList.contains("visuallyhidden") ? false : true;

      if (displayLabel && isVisible) {
        label = document.createElement("div");
        label.classList.add("RE-label");
        if (target.className) {
          text = document.createTextNode(target.className);
          label.style.position = "absolute";
          label.style.top = "0px";
          label.style.left = "-1px";
          label.style.fontFamily =
            "-apple-system, Helvetica, Arial, sans-serif";
          label.style.fontWeight = "bold";
          label.style.letterSpacing = "0.05rem";
          label.style.fontSize = "9px";
          label.style.color = "white";
          label.style.background = bgColor;
          label.style.padding = "6px";
          label.style.pointerEvents = "none";
          label.style.textAlign = "left";
          label.style.transform = "translateY(-100%)";
          label.appendChild(text);
        }
        target.appendChild(label);
        updatePosition = true;
      }

      if (fullHorizontal && isVisible) {
        line = document.createElement("div");
        line.classList.add("RE-line-top");
        line.style.position = "absolute";
        line.style.top = "100%";
        line.style.left = "50%";
        line.style.width = "400vw";
        line.style.height = "1px";
        line.style.background = color5;
        line.style.transform = "translateX(-50%)";
        line.style.pointerEvents = "none";
        target.appendChild(line);

        line = document.createElement("div");
        line.classList.add("RE-line-bottom");
        line.style.position = "absolute";
        line.style.top = "-1px";
        line.style.left = "50%";
        line.style.width = "400vw";
        line.style.height = "1px";
        line.style.background = color5;
        line.style.transform = "translateX(-50%)";
        line.style.pointerEvents = "none";
        target.appendChild(line);
        updatePosition = true;
      }

      if (query == "img" && isVisible) {
        overlay = document.createElement("div");
        overlay.classList.add("RE-overlay");
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = color5;
        parentElement = target.parentElement;
        style = window.getComputedStyle(parentElement);
        position = style.getPropertyValue("position");
        if (position != "sticky" && position != "absolute") {
          parentElement.style.position = "relative";
        }
        parentElement.appendChild(overlay);
      }

      if (updatePosition) {
        style = window.getComputedStyle(target);
        position = style.getPropertyValue("position");
        if (position != "sticky" && position != "absolute") {
          target.style.position = "relative";
        }
      }

      target.style.outline = "1px " + color + " solid";
    }
  };

  const removeDebugDecoration = (query, domElements, displayLabel, fullHorizontal) => {
    let target, isVisible, parentElement;
    for (let i = 0; i < domElements.length; i++) {
      target = domElements[i];
			isVisible = target.classList.contains("visuallyhidden") ? false : true;
      if (query == "img" && isVisible) {
        try {
					parentElement = target.parentElement;
          parentElement.removeChild(parentElement.getElementsByClassName("RE-overlay")[0]);
        } catch (e) {
          //console.log(e);
        }
      }
			if (displayLabel && isVisible) {
        try {
          target.removeChild(target.getElementsByClassName("RE-label")[0]);
        } catch (e) {
          //console.log(e);
        }
      }
      if (fullHorizontal && isVisible) {
        try {
          target.removeChild(target.getElementsByClassName("RE-line-top")[0]);
        } catch (e) {
          //console.log(e);
        }
        try {
          target.removeChild(
            target.getElementsByClassName("RE-line-bottom")[0]
          );
        } catch (e) {
          //console.log(e);
        }
      }
      target.style.outline = "none";
    }
  };

  const onResizeHandler = () => {
    const body = document.getElementsByTagName("body")[0];
    const width = Number(document.body.clientWidth);
    const label = body.getElementsByClassName("RE-viewport-label")[0];
    if (label) {
      label.textContent = "XS";
      if (width > 480) {
        label.textContent = "S";
      }
      if (width > 734) {
        label.textContent = "M";
      }
      if (width > 1068) {
        label.textContent = "L";
      }
      if (width > 1440) {
        label.textContent = "XL";
      }
    }
  };

  const toggleDecorations = (elements) => {
    const body = document.getElementsByTagName("body")[0];
    let state, viewportLabel;

    if (body.getAttribute("RE-decoration")) {
      if (body.getElementsByClassName("RE-viewport-label")) {
        viewportLabel = body.getElementsByClassName("RE-viewport-label")[0];
        body.removeChild(viewportLabel);
      }
      window.removeEventListener("resize", onResizeHandler);
      body.removeAttribute("RE-decoration");
      state = "remove";
    } else {
      viewportLabel = document.createElement("div");
      viewportLabel.classList.add("RE-viewport-label");
      viewportLabel.style.cursor = "pointer";
      viewportLabel.style.position = "fixed";
      viewportLabel.style.bottom = "15px";
      viewportLabel.style.right = "30px";
      viewportLabel.style.width = "35px";
      viewportLabel.style.height = "35px";
      viewportLabel.style.lineHeight = "35px";
      viewportLabel.style.fontFamily =
        "-apple-system, Helvetica, Arial, sans-serif";
      viewportLabel.style.fontWeight = "bold";
      viewportLabel.style.letterSpacing = "0rem";
      viewportLabel.style.fontSize = "0.75rem";
      viewportLabel.style.color = "white";
      viewportLabel.style.background = bgColor;
      viewportLabel.style.borderRadius = "100%";
      viewportLabel.style.textAlign = "center";
      viewportLabel.style.zIndex = "9999";
      body.appendChild(viewportLabel);

      window.addEventListener("resize", onResizeHandler);
      onResizeHandler();

      body.style.overflowX = "hidden";
      body.setAttribute("RE-decoration", "true");
      state = "add";
    }

    elements.forEach((element) => {
      let domElements;
      if (element.type == "query") {
        domElements = document.querySelectorAll(element.query);
      }
      if (element.type == "className") {
        domElements = document.getElementsByClassName(kebabize(element.query));
      }

      if (element.type == "contains") {
        const allElements = document.querySelectorAll("div");
        domElements = [...allElements].filter(
          (elementDiv) => elementDiv.className.indexOf(element.query) >= 1
        );
      }
      if (domElements && domElements.length >= 1) {
        if (state == "remove") {
          removeDebugDecoration(
						element.query,
            domElements,
            element.displayLabel,
            element.fullHorizontal
          );
        }
        if (state == "add") {
          addDebugDecoration(
            element.query,
            domElements,
            element.color,
            element.displayLabel,
            element.fullHorizontal
          );
        }
      }
    });
  };

  const elements = [
    {
      query: "viewportContent",
      type: "className",
      color: color2,
      displayLabel: false,
    },
    {
      query: "h1",
      type: "query",
      color: color3,
      displayLabel: true,
      fullHorizontal: true,
    },
    {
      query: "h2",
      type: "query",
      color: color3,
      displayLabel: true,
      fullHorizontal: true,
    },
    {
      query: "h3",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: true,
    },
    {
      query: "h4",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: true,
    },
    {
      query: "h5",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: true,
    },
    {
      query: "li",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: false,
    },
    {
      query: "p",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: true,
    },
    {
      query: "a",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: false,
    },

    {
      query: "button",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: false,
    },
    {
      query: "img",
      type: "query",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
    },
    {
      query: "wrapper",
      type: "contains",
      color: color4,
      displayLabel: false,
    },
    {
      query: "container",
      type: "contains",
      color: color4,
      displayLabel: false,
    },
    {
      query: "item",
      type: "contains",
      color: color4,
      displayLabel: false,
    },
    {
      query: "badge",
      type: "className",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
    },
    {
      query: "row",
      type: "className",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
    },
    {
      query: "column",
      type: "className",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
    },
    {
      query: "inlineCompareWrap",
      type: "className",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
    },
    {
      query: "card",
      type: "className",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
    },
    {
      query: "section",
      type: "className",
      color: color1,
      displayLabel: false,
      fullHorizontal: false,
    },
  ];

  toggleDecorations(elements);
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectedFunction,
  });
});
