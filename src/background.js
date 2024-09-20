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

  const color1 = "rgb(222,0,255)";
  const color2 = "rgba(222,0,255,0.5)";
  const color3 = "rgba(222,0,255,0.35)";
  const color4 = "rgba(222,0,255,0.25)";
  const color5 = "rgba(222,0,255,0.15)";

  const isElementVisible = (target) => {
    if (target.classList.contains("visuallyhidden")) {
      return false;
    }

		style = window.getComputedStyle(target);
		if (style.getPropertyValue("display") == "none") {
			return false;
		}

    return true;
  };

  const addDebugDecoration = (
    query,
    domElements,
    color,
    displayLabel,
    fullHorizontal,
    displayOverlay
  ) => {
    let target,
      parentElement,
      style,
      position,
      display,
      label,
      text,
      line,
      overlay,
      isVisible,
      updatePosition;

    for (let i = 0; i < domElements.length; i++) {
      target = domElements[i];
      updatePosition = false;

      isVisible = isElementVisible(target);

      if (isVisible) {
        if (displayLabel) {
          label = document.createElement("div");
          label.classList.add("RE-label");
          if (target.className) {
            text = document.createTextNode(query + ": "+target.className);
            label.style.position = "absolute";
            label.style.top = "0px";
            label.style.left = "-1px";
            label.style.fontFamily =
              "-apple-system, Helvetica, Arial, sans-serif";
            label.style.fontWeight = "bold";
            label.style.letterSpacing = "1px";
            label.style.fontSize = "9px";
            label.style.lineHeight = "9px";
            label.style.textTransform = "none";
            label.style.color = "white";
            label.style.background = color1;
            label.style.padding = "6px";
            label.style.pointerEvents = "none";
            label.style.textAlign = "left";
            label.style.transform = "translateY(-100%)";
            label.appendChild(text);
          }
          target.appendChild(label);
          updatePosition = true;
        }

        if (fullHorizontal) {
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

        if (displayOverlay) {
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
          if (
            position != "sticky" &&
            position != "absolute" &&
            position != "fixed"
          ) {
            parentElement.style.position = "relative";
          }
          parentElement.appendChild(overlay);
        }

        if (updatePosition) {
          style = window.getComputedStyle(target);
          position = style.getPropertyValue("position");
          if (
            position != "sticky" &&
            position != "absolute" &&
            position != "fixed"
          ) {
            target.style.position = "relative";
          }
        }
      }

      target.style.outline = "1px " + color + " solid";
    }
  };

  const removeDebugDecoration = (
    query,
    domElements,
    displayLabel,
    fullHorizontal,
    displayOverlay
  ) => {
    let target, parentElement, isVisible;

    for (let i = 0; i < domElements.length; i++) {
      target = domElements[i];

			isVisible = isElementVisible(target);

			if(isVisible){
      if (displayOverlay) {
        try {
          parentElement = target.parentElement;
          parentElement.removeChild(
            parentElement.getElementsByClassName("RE-overlay")[0]
          );
        } catch (e) {
          //console.log(e);
        }
      }
      if (displayLabel) {
        try {
          target.removeChild(target.getElementsByClassName("RE-label")[0]);
        } catch (e) {
          //console.log(e);
        }
      }
      if (fullHorizontal) {
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

    if (body.getAttribute("RE-WebSkeleton")) {
      if (body.getElementsByClassName("RE-viewport-label")) {
        viewportLabel = body.getElementsByClassName("RE-viewport-label")[0];
        body.removeChild(viewportLabel);
      }
      window.removeEventListener("resize", onResizeHandler);
      body.removeAttribute("RE-WebSkeleton");
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
      viewportLabel.style.background = color1;
      viewportLabel.style.borderRadius = "100%";
      viewportLabel.style.textAlign = "center";
      viewportLabel.style.zIndex = "9999";
      body.appendChild(viewportLabel);

      window.addEventListener("resize", onResizeHandler);
      onResizeHandler();

      body.style.overflowX = "hidden";
      body.setAttribute("RE-WebSkeleton", "true");
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
            element.fullHorizontal,
            element.displayOverlay
          );
        }
        if (state == "add") {
          addDebugDecoration(
            element.query,
            domElements,
            element.color,
            element.displayLabel,
            element.fullHorizontal,
            element.displayOverlay
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
      fullHorizontal: false,
      displayOverlay: false,
    },

    {
      query: "h1",
      type: "query",
      color: color3,
      displayLabel: true,
      fullHorizontal: true,
      displayOverlay: false,
    },
    {
      query: "h2",
      type: "query",
      color: color3,
      displayLabel: true,
      fullHorizontal: true,
      displayOverlay: false,
    },
    {
      query: "h3",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: true,
      displayOverlay: false,
    },
    {
      query: "h4",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: true,
      displayOverlay: false,
    },
    {
      query: "h5",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: true,
      displayOverlay: false,
    },

    {
      query: "p",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: true,
      displayOverlay: false,
    },
    {
      query: "a",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: false,
    },
    {
      query: "button",
      type: "query",
      color: color3,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: false,
    },
    {
      query: "img",
      type: "query",
      color: color2,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: true,
    },
    {
      query: "canvas",
      type: "query",
      color: color2,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: true,
    },
    {
      query: "wrapper",
      type: "contains",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: false,
    },
    {
      query: "container",
      type: "contains",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: false,
    },
    {
      query: "badge",
      type: "className",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: false,
    },
    {
      query: "row",
      type: "className",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: false,
    },
    {
      query: "column",
      type: "className",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: false,
    },
    {
      query: "inlineCompareWrap",
      type: "className",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: false,
    },
    {
      query: "card",
      type: "className",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: false,
    },
    {
      query: "section",
      type: "className",
      color: color2,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: false,
    },
    {
      query: "li",
      type: "query",
      color: color4,
      displayLabel: false,
      fullHorizontal: false,
      displayOverlay: false,
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
