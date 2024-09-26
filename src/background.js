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
  const color2 = "rgba(222,0,255,0.6)";
  const color3 = "rgba(222,0,255,0.5)";
  const color4 = "rgba(222,0,255,0.4)";
  const color5 = "rgba(222,0,255,0.3)";
  const color6 = "rgba(222,0,255,0.2)";
  const color7 = "rgba(222,0,255,0.1)";
  const colors = [color1, color2, color3, color4, color5, color6, color7];

  const colorTest = "rgba(0, 0, 255, 1)";

  const isElementVisible = (target, query) => {
    if (target.classList.contains("visuallyhidden")) {
      return false;
    }

    if (
      query == "p" ||
      query == "h1" ||
      query == "h2" ||
      query == "h3" ||
      query == "h4" ||
      query == "h5" ||
      query == "h6" ||
      query == "h7"
    ) {
      if (String(target.textContent).length <= 1) {
        return false;
      }
    }


    style = window.getComputedStyle(target);
    if (style.getPropertyValue("display") == "none") {
      return false;
    }

    let size = target.getBoundingClientRect();
    if (size.width <= 12 || size.height <= 12) return false;

    if (style.getPropertyValue("visibility") == "hidden") {
      return false;
    }

    return true;
  };

  const createLabel = (
    query,
    top,
    left,
    bottom,
    right,
    transform,
    isParent
  ) => {
    let label = document.createElement("div");
    if (isParent) {
      label.classList.add("web-skeleton-label-parent");
    } else {
      label.classList.add("web-skeleton-label");
    }
    label.classList.add("web-skeleton-label-" + query);
    text = document.createTextNode(query);
    label.setAttribute("web-skeleton-label", query);
    label.style.position = "absolute";
    label.style.top = top;
    label.style.left = left;
    label.style.right = right;
    label.style.bottom = bottom;
    label.style.width = "auto";
    label.style.height = "auto";
    label.style.fontFamily = "-apple-system, Helvetica, Arial, sans-serif";
    label.style.fontWeight = "bold";
    label.style.letterSpacing = "2px";
    label.style.fontSize = "9px";
    label.style.lineHeight = "9px";
    label.style.textTransform = "none";
    label.style.color = "white";
    label.style.background = color1;
    label.style.padding = "6px";
		label.style.margin = "0px";
    label.style.pointerEvents = "none";
    label.style.textAlign = "left";
		label.style.overflow = "hidden";
    label.style.transform = transform;
    label.style.whiteSpace = "nowrap";
		label.style.filter = "none";
		label.style.webkitTextFillColor = "white";
    label.style.zIndex = 999;
    label.appendChild(text);

    return label;
  };

  const setRelativePosition = (element) => {
    const style = window.getComputedStyle(element);
    const position = style.getPropertyValue("position");
    if (position != "sticky" && position != "absolute" && position != "fixed") {
      element.style.position = "relative";
    }
  };

  const addDebugDecoration = (
    query,
    type,
    domElements,
    color,
    overlayColor,
    displayLabel,
    displayLines,
    displayOverlay,
    overlayTarget
  ) => {
    let target,
      overlayTargetElement,
      style,
      label,
      line,
      overlay,
      isVisible,
      updatePosition;

    for (let i = 0; i < domElements.length; i++) {
      target = domElements[i];
      updatePosition = false;
      isVisible = isElementVisible(target, query);

      if (isVisible) {
        style = window.getComputedStyle(target);

        if (displayOverlay || displayLabel) {
          if (overlayTarget == "parent") {
            overlayTargetElement = target.parentElement;
            setRelativePosition(overlayTargetElement);
          } else {
            overlayTargetElement = target;
          }
        }

        if (
          displayLabel &&
          !displayOverlay &&
          target.getBoundingClientRect().width > 100
        ) {
					console.log("RE / [background.js:158]: ", style.getPropertyValue("display"));
          if (
            query == "section" ||
            query == "container"
          ) {
            label = createLabel(
              type == "className" ? kebabize(query) : query,
              "0px",
              "0px",
              "auto",
              "auto",
              "translateY(-100%)",
              false
            );
					} else if (query == "p" && style.getPropertyValue("display") == "inline"){
						// Skip this element for now
          } else if (query == "footer") {
            label = createLabel(
              type == "className" ? kebabize(query) : query,
              "0px",
              "0px",
              "auto",
              "auto",
              "none",
              false
            );
          } else if (query == "content") {
            label = createLabel(
              type == "className" ? kebabize(query) : query,
              "0px",
              "auto",
              "auto",
              "-1px",
              "none",
              false
            );
          } else {
            label = createLabel(
              type == "className" ? kebabize(query) : query,
              "0px",
              "auto",
              "auto",
              "-1px",
              "translateY(-100%)",
              false
            );
          }
          overlayTargetElement.appendChild(label);
          updatePosition = true;
        }

        if (
          displayLines &&
          target.getElementsByClassName("web-skeleton-line-top").length <= 0
        ) {
          line = document.createElement("div");
          line.classList.add("web-skeleton-line-top");
          line.style.position = "absolute";
          line.style.top = "-1px";
          line.style.left = "50%";
          line.style.width = "200vw";
          line.style.height = "1px";
          line.style.background = color6;
          line.style.pointerEvents = "none";
          line.style.transform = "translateX(-50%)";
          line.style.zIndex = 999;
          target.appendChild(line);

          line = document.createElement("div");
          line.classList.add("web-skeleton-line-bottom");
          line.style.position = "absolute";
          line.style.top = "100%";
          line.style.left = "50%";
          line.style.width = "200vw";
          line.style.height = "1px";
          line.style.background = color6;
          line.style.pointerEvents = "none";
          line.style.transform = "translateX(-50%)";
          line.style.zIndex = 999;
          target.appendChild(line);
          updatePosition = true;
        }

        if (displayOverlay) {
          overlay = document.createElement("div");
          overlay.classList.add("web-skeleton-overlay");
          overlay.classList.add("web-skeleton-overlay-" + overlayTarget);
          overlay.style.position = "absolute";
          overlay.style.top = "0";
          overlay.style.left = "0";
          overlay.style.width = "100%";
          overlay.style.height = "100%";
          overlay.style.backgroundColor = overlayColor;
          overlay.style.pointerEvents = "none";
          overlay.style.zIndex = 999;

          if (displayLabel) {
            label = createLabel(
              query,
              "50%",
              "50%",
              "auto",
              "auto",
              "translate(-50%, -50%)",
              overlayTarget == "parent" ? true : false
            );
            overlay.appendChild(label);
          }
          overlayTargetElement.appendChild(overlay);
        }

        if (updatePosition) {
          setRelativePosition(target);
        }

        if (style.getPropertyValue("outline-width") == "0px") {
          target.style.outline = "1px " + color + " solid";
          target.classList.add("web-skeleton");
        }

        if (query == "svg") {
          target.classList.add("web-skeleton-svg");
          target.setAttribute("web-skeleton-svg-bg", style.backgroundColor);
          target.style.backgroundColor = overlayColor;
        }

        if (query == "figure") {
          target.classList.add("web-skeleton-figure");
          target.setAttribute("web-skeleton-figure-bg", style.backgroundColor);
          target.style.backgroundColor = overlayColor;
        }
      }
    }
  };

	const hideOverlappingLines = () => {
		// TODO: implement!
	};

  const hideOverlappingLabels = (key) => {
    const domElements = document.getElementsByClassName(
      "web-skeleton-label-" + key
    );
    const padding = 6;
    let ele1, ele2, collides;
    for (let i = 0; i < domElements.length; i++) {
      ele1 = domElements[i];
      for (let a = 0; a < domElements.length; a++) {
				ele2 = domElements[a];
        if (ele1 != ele2) {
          let r1 = ele1.getBoundingClientRect();
          let r2 = ele2.getBoundingClientRect();
          collides =
            r1.y <= r2.y + r2.height - padding &&
            r1.y + r1.height - padding >= r2.y &&
            r1.x <= r2.x + r2.width - padding &&
            r1.x + r1.width - padding >= r2.y;
          if (collides) {
						ele1.style.visibility = "hidden";
						break;
          }
        }
      }
    }
  };

  const removeElementsByClass = (name, isParent, query) => {
    let domElements, target, parentElement;
    domElements = document.getElementsByClassName(name);
    if (domElements) {
      for (let i = 0; i < domElements.length; i++) {
        target = domElements[i];
        if (isParent) {
          parentElement = target.parentElement;
          parentElement.removeChild(target);
        } else {
          if (target.classList.contains("web-skeleton")) {
            target.classList.remove("web-skeleton");
            target.style.outline = "none";
          }
        }
        if (query == "svg") {
          target.style.backgroundColor = target.getAttribute(
            "web-skeleton-svg-bg"
          );
        }
        if (query == "figure") {
          target.style.backgroundColor = target.getAttribute(
            "web-skeleton-figure-bg"
          );
        }
      }
    }
  };

  const removeDebugDecoration = () => {
    removeElementsByClass("web-skeleton-svg", false, "svg");
    removeElementsByClass("web-skeleton-figure", false, "figure");
    removeElementsByClass("web-skeleton", false, "");
    removeElementsByClass("web-skeleton-overlay", true, "");
    removeElementsByClass("web-skeleton-label", true, "");
    removeElementsByClass("web-skeleton-line-top", true, "");
    removeElementsByClass("web-skeleton-line-bottom", true, "");
  };

  const updateOverlaysLabel = () => {
    const domElements = document.getElementsByClassName(
      "web-skeleton-overlay-parent"
    );
    for (let i = 0; i < domElements.length; i++) {
      let target = domElements[i];
      let label = target.getElementsByClassName("web-skeleton-label-parent")[0];
      let child = target.parentElement.querySelectorAll("img")[0];
      if (!child) {
        child = target.parentElement.querySelectorAll("svg")[0];
      }
      let size = target.getBoundingClientRect();
      if (child) {
        size = child.getBoundingClientRect();
      }
      if (label) {
        if (size.width <= 1 || size.height <= 1) {
          label.style.visibility = "hidden";
        } else {
          label.style.visibility = "visible";
          label.textContent =
            Math.round(size.width) + " x " + Math.round(size.height);
        }
      }
    }
  };

  const onScrollHandler = () => {
    updateOverlaysLabel();
		hideOverlappingLabels("content");
		hideOverlappingLines();
  };

  const updateViewportLabel = () => {
    const body = document.getElementsByTagName("body")[0];
    let vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    let vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const label = body.getElementsByClassName("web-skeleton-viewport-label")[0];
    if (label) {
      let content = "XS";
      if (vw > 480) {
        content = "S";
      }
      if (vw > 734) {
        content = "M";
      }
      if (vw > 1068) {
        content = "L";
      }
      if (vw > 1440) {
        content = "XL";
      }
      content += "&nbsp;" + vw + " x " + vh;
      label.innerHTML = content;
    }
  };

  const onResizeHandler = () => {
    updateViewportLabel();
    updateOverlaysLabel();
  };

  const toggleDecorations = (elements) => {
    const body = document.getElementsByTagName("body")[0];
    let viewportLabel;

    if (body.getAttribute("WebSkeleton")) {
      if (body.getElementsByClassName("web-skeleton-viewport-label")) {
        viewportLabel = body.getElementsByClassName(
          "web-skeleton-viewport-label"
        )[0];
        body.removeChild(viewportLabel);
      }
      window.removeEventListener("resize", onResizeHandler);
      window.removeEventListener("scroll", onScrollHandler);
      body.removeAttribute("WebSkeleton");
      //
      for (let i = 0; i < 22; i++) {
        removeDebugDecoration();
      }
      return;
      //
    } else {
      viewportLabel = document.createElement("div");
      viewportLabel.classList.add("web-skeleton-viewport-label");
      viewportLabel.style.userSelect = "none";
      viewportLabel.style.position = "fixed";
      viewportLabel.style.bottom = "30px";
      viewportLabel.style.right = "30px";
      viewportLabel.style.lineHeight = "10px";
      viewportLabel.style.fontFamily =
        "-apple-system, Helvetica, Arial, sans-serif";
      viewportLabel.style.fontWeight = "bold";
      viewportLabel.style.letterSpacing = "2px";
      viewportLabel.style.fontSize = "10px";
      viewportLabel.style.color = "white";
      viewportLabel.style.background = color1;
      viewportLabel.style.padding = "6px";
      viewportLabel.style.textAlign = "right";
      viewportLabel.style.zIndex = "999999";
      body.appendChild(viewportLabel);

      window.addEventListener("resize", onResizeHandler);
      window.addEventListener("scroll", onScrollHandler);
      onResizeHandler();

      body.style.overflowX = "hidden";
      body.setAttribute("WebSkeleton", "true");

      // Sorting element by color so stronger colors have priority over blended ones.
      elements.sort((a, b) => parseFloat(a.color) - parseFloat(b.color));
    }

    const allElements = body.querySelectorAll("div, span");

    elements.forEach((element) => {
      let domElements;
      if (element.type == "query") {
        domElements = document.querySelectorAll(element.query);
      }
      if (element.type == "className") {
        domElements = document.getElementsByClassName(kebabize(element.query));
      }

      if (element.type == "contains") {
        domElements = [...allElements].filter(
          (elementDiv) => elementDiv.className.indexOf(element.query) >= 0
        );
      }

      if (domElements && domElements.length >= 1) {
        addDebugDecoration(
          element.query ? element.query : "",
          element.type ? element.type : "",
          domElements,
          element.color ? colors[element.color - 1] : colorTest,
          element.overlayColor ? element.overlayColor : color5,
          element.displayLabel ? element.displayLabel : false,
          element.displayLines ? element.displayLines : false,
          element.displayOverlay ? element.displayOverlay : false,
          element.overlayTarget ? element.overlayTarget : "self"
        );
        updateOverlaysLabel();
      }
    });
		hideOverlappingLabels("content");
		hideOverlappingLines();
  };

  const elements = [
    {
      query: "h1",
      type: "query",
      color: 3,
      displayLabel: true,
      displayLines: true,
    },

    {
      query: "h2",
      type: "query",
      color: 3,
      displayLabel: true,
      displayLines: true,
    },
    {
      query: "h3",
      type: "query",
      color: 3,
      displayLabel: true,
      displayLines: true,
    },
    {
      query: "h4",
      type: "query",
      color: 3,
      displayLabel: true,
      displayLines: true,
    },
    {
      query: "h5",
      type: "query",
      color: 3,
      displayLabel: true,
    },
    {
      query: "h6",
      type: "query",
      color: 3,
      displayLabel: true,
    },
    {
      query: "h7",
      type: "query",
      color: 3,
      displayLabel: true,
    },
    {
      query: "h8",
      type: "query",
      color: 3,
      displayLabel: true,
    },
    {
      query: "p",
      type: "query",
      color: 4,
      displayLabel: true,
      displayLines: true,
    },
    {
      query: "a",
      type: "query",
      color: 4,
    },
    {
      query: "button",
      type: "query",
      color: 3,
    },
    {
      query: "img",
      type: "query",
      color: 3,
      overlayColor: color6,
      displayLabel: true,
      displayOverlay: true,
      overlayTarget: "parent",
    },
    {
      query: "video",
      type: "query",
      color: 4,
    },
    {
      query: "figure",
      type: "query",
      color: 4,
      overlayColor: color6,
    },
    {
      query: "canvas",
      type: "query",
      color: 3,
      overlayColor: color6,
      displayOverlay: true,
      overlayTarget: "parent",
    },
    {
      query: "svg",
      type: "query",
      color: 3,
      overlayColor: color6,
    },
    {
      query: "player",
      type: "contains",
      color: 4,
    },
    {
      query: "film",
      type: "contains",
      color: 4,
    },
    {
      query: "wrapper",
      type: "contains",
      color: 4,
    },
    {
      query: "item",
      type: "contains",
      color: 6,
    },
    {
      query: "container",
      type: "contains",
      color: 3,
      displayLabel: true,
    },
    {
      query: "content",
      type: "contains",
      color: 4,
      displayLabel: true,
    },
    {
      query: "badge",
      type: "className",
      color: 4,
    },
    {
      query: "row",
      type: "contains",
      color: 5,
    },
    {
      query: "column",
      type: "contains",
      color: 5,
    },
    {
      query: "quote",
      type: "contains",
      color: 4,
    },
    {
      query: "text",
      type: "contains",
      color: 4,
    },
    {
      query: "txt",
      type: "contains",
      color: 4,
    },
    {
      query: "col",
      type: "contains",
      color: 5,
    },
    {
      query: "headline",
      type: "contains",
      color: 5,
    },
    {
      query: "tile",
      type: "contains",
      color: 5,
    },
    {
      query: "inlineCompareWrap",
      type: "className",
      color: 4,
    },
    {
      query: "card",
      type: "className",
      color: 3,
    },
    {
      query: "section",
      type: "className",
      color: 3,
      displayLabel: true,
    },
    {
      query: "small",
      type: "query",
      color: 3,
    },
    {
      query: "li",
      type: "query",
      color: 5,
    },
    {
      query: "form",
      type: "query",
      color: 5,
    },
    {
      query: "tr",
      type: "query",
      color: 6,
    },
    {
      query: "td",
      type: "query",
      color: 7,
    },
    {
      query: "strong",
      type: "query",
      color: 7,
    },

    {
      query: "footer",
      type: "query",
      color: 5,
      displayLabel: true,
    },
    {
      query: "nav",
      type: "query",
      color: 5,
    },
    {
      query: "figcaption",
      type: "query",
      color: 5,
    },
    {
      query: "caption",
      type: "query",
      color: 5,
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
