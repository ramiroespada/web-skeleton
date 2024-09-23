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
  const color2 = "rgba(222,0,255,0.45)";
  const color3 = "rgba(222,0,255,0.35)";
  const color4 = "rgba(222,0,255,0.25)";
  const color5 = "rgba(222,0,255,0.15)";
  const colorTest = "rgba(0, 0, 255, 1)";

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

  const createLabel = (content, top, left, bottom, right, transform) => {
    let label = document.createElement("div");
    label.classList.add("web-skeleton-label");

    text = document.createTextNode(content);
		label.setAttribute("web-skeleton-label", content);
    label.style.position = "absolute";
    label.style.top = top;
    label.style.left = left;
    label.style.right = right;
    label.style.bottom = bottom;
		label.style.width = "auto";
		label.style.height = "auto";
    label.style.fontFamily = "-apple-system, Helvetica, Arial, sans-serif";
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
    label.style.transform = transform;
    label.style.whiteSpace = "nowrap";
    label.appendChild(text);

    return label;
  };

  const addDebugDecoration = (
    query,
    type,
    domElements,
    color,
    displayLabel,
    displayLines,
    displayOverlay,
    overlayTarget
  ) => {
    let target,
      overlayTargetElement,
      style,
      position,
      label,
      line,
      overlay,
      isVisible,
      updatePosition;

    for (let i = 0; i < domElements.length; i++) {
      target = domElements[i];
      updatePosition = false;

      isVisible = isElementVisible(target);

      if (isVisible) {
        if (displayLabel && !displayOverlay) {
          // + " " + target.className
          label = createLabel(
            type == "className" ? kebabize(query) : query,
            "0px",
            "auto",
            "auto",
            "0px",
            "translateY(-100%)"
          );
          target.appendChild(label);
          updatePosition = true;
        }

        if (displayLines) {
          line = document.createElement("div");
          line.classList.add("web-skeleton-line-top");
          line.style.position = "absolute";
          line.style.top = "-1px";
          line.style.left = "calc(100% + 1px)";
          line.style.width = "100vw";
          line.style.height = "1px";
          line.style.background = color5;
          line.style.pointerEvents = "none";
          target.appendChild(line);

          line = document.createElement("div");
          line.classList.add("web-skeleton-line-top");
          line.style.position = "absolute";
          line.style.top = "-1px";
          line.style.left = "calc(-100vw - 1px)";
          line.style.width = "100vw";
          line.style.height = "1px";
          line.style.background = color5;
          line.style.pointerEvents = "none";
          target.appendChild(line);

          line = document.createElement("div");
          line.classList.add("web-skeleton-line-bottom");
          line.style.position = "absolute";
          line.style.top = "100%";
          line.style.left = "calc(100% + 1px)";
          line.style.width = "100vw";
          line.style.height = "1px";
          line.style.background = color5;
          line.style.pointerEvents = "none";
          target.appendChild(line);

          line = document.createElement("div");
          line.classList.add("web-skeleton-line-bottom");
          line.style.position = "absolute";
          line.style.top = "100%";
          line.style.left = "calc(-100vw - 1px)";
          line.style.width = "100vw";
          line.style.height = "1px";
          line.style.background = color5;
          line.style.pointerEvents = "none";
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
          overlay.style.backgroundColor = color5;
					overlay.style.pointerEvents = "none";
          if (overlayTarget == "parent") {
            overlayTargetElement = target.parentElement;
          } else {
            overlayTargetElement = target;
          }
          style = window.getComputedStyle(overlayTargetElement);
          position = style.getPropertyValue("position");
          if (
            position != "sticky" &&
            position != "absolute" &&
            position != "fixed"
          ) {
            overlayTargetElement.style.position = "relative";
          }

          if (displayLabel) {
            label = createLabel(
              query,
              "50%",
              "50%",
              "auto",
              "auto",
              "translate(-50%, -50%)"
            );
            overlay.appendChild(label);
          }
          overlayTargetElement.appendChild(overlay);
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
      target.classList.add("web-skeleton");
      target.style.outline = "1px " + color + " solid";
    }
  };

  const removeElementsByClass = (name, isParent) => {
    let domElements, target, parentElement;
    domElements = document.getElementsByClassName(name);
    for (let i = 0; i < domElements.length; i++) {
      target = domElements[i];
      if (isParent) {
        parentElement = target.parentElement;
        parentElement.removeChild(target);
      } else {
        target.style.outline = "none";
      }
    }
  };

  const removeDebugDecoration = () => {
    removeElementsByClass("web-skeleton", false);
    removeElementsByClass("web-skeleton-overlay", true);
    removeElementsByClass("web-skeleton-label", true);
    removeElementsByClass("web-skeleton-line-top", true);
    removeElementsByClass("web-skeleton-line-bottom", true);
  };

  const updateOverlaysLabel = () => {
    const domElements = document.getElementsByClassName("web-skeleton-overlay");
    for (let i = 0; i < domElements.length; i++) {
      let target = domElements[i];
      let size = target.getBoundingClientRect();
      let label = target.getElementsByClassName("web-skeleton-label")[0];
      if (label) {
        label.textContent =
          Math.round(size.width) + "x" + Math.round(size.height);
      }
    }
  };

  const onScrollHandler = () => {
    updateOverlaysLabel();
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
      content += "&nbsp;" + vw + "x" + vh;
      label.innerHTML = content;
    }
  };

  const onResizeHandler = () => {
    updateViewportLabel();
    updateOverlaysLabel();
  };

  const toggleDecorations = (elements) => {
    const body = document.getElementsByTagName("body")[0];
    let state, viewportLabel;

    if (body.getAttribute("WebSkeleton")) {
      if (body.getElementsByClassName("web-skeleton-viewport-label")) {
        viewportLabel = body.getElementsByClassName("web-skeleton-viewport-label")[0];
        body.removeChild(viewportLabel);
      }
      window.removeEventListener("resize", onResizeHandler);
      window.removeEventListener("scroll", onScrollHandler);
      body.removeAttribute("WebSkeleton");
      state = "remove";
    } else {
      viewportLabel = document.createElement("div");
      viewportLabel.classList.add("web-skeleton-viewport-label");
      viewportLabel.style.userSelect = "none";
      viewportLabel.style.position = "fixed";
      viewportLabel.style.bottom = "15px";
      viewportLabel.style.right = "30px";
      viewportLabel.style.lineHeight = "10px";
      viewportLabel.style.fontFamily =
        "-apple-system, Helvetica, Arial, sans-serif";
      viewportLabel.style.fontWeight = "bold";
      viewportLabel.style.letterSpacing = "1px";
      viewportLabel.style.fontSize = "10px";
      viewportLabel.style.color = "white";
      viewportLabel.style.background = color1;
      viewportLabel.style.padding = "6px";
      viewportLabel.style.textAlign = "right";
      viewportLabel.style.zIndex = "9999";
      body.appendChild(viewportLabel);

      window.addEventListener("resize", onResizeHandler);
      window.addEventListener("scroll", onScrollHandler);
      onResizeHandler();

      body.style.overflowX = "hidden";
      body.setAttribute("WebSkeleton", "true");
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
          removeDebugDecoration();
        }
        if (state == "add") {
          addDebugDecoration(
            element.query ? element.query : "",
            element.type ? element.type : "",
            domElements,
            element.color ? element.color : colorTest,
            element.displayLabel ? element.displayLabel : false,
            element.displayLines ? element.displayLines : false,
            element.displayOverlay ? element.displayOverlay : false,
            element.overlayTarget ? element.overlayTarget : ""
          );
          updateOverlaysLabel();
        }
      }
    });
  };

  const elements = [
    {
      query: "viewportContent",
      type: "className",
      color: color2,
      displayLabel: true,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "h1",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: true,
      displayOverlay: false,
    },
    {
      query: "h2",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: true,
      displayOverlay: false,
    },
    {
      query: "h3",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: true,
      displayOverlay: false,
    },
    {
      query: "h4",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "h5",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "h6",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "p",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: true,
      displayOverlay: false,
    },
    {
      query: "a",
      type: "query",
      color: color3,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "button",
      type: "query",
      color: color3,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "img",
      type: "query",
      color: color2,
      displayLabel: true,
      displayLines: false,
      displayOverlay: true,
      overlayTarget: "parent",
    },
		{
      query: "video",
      type: "query",
      color: color2,
      displayLabel: false,
      displayLines: false,
      displayOverlay: true,
      overlayTarget: "parent",
    },
    {
      query: "figure",
      type: "query",
      color: color2,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
      overlayTarget: "self",
    },
    {
      query: "canvas",
      type: "query",
      color: color2,
      displayLabel: true,
      displayLines: false,
      displayOverlay: true,
			overlayTarget: "parent",
    },
    {
      query: "wrapper",
      type: "contains",
      color: color4,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "item",
      type: "contains",
      color: color4,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "container",
      type: "contains",
      color: color4,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "badge",
      type: "className",
      color: color4,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "row",
      type: "contains",
      color: color4,
      displayLabel: false,
      displayLines: true,
      displayOverlay: false,
    },
    {
      query: "column",
      type: "contains",
      color: color4,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "inlineCompareWrap",
      type: "className",
      color: color4,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "card",
      type: "className",
      color: color4,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "section",
      type: "className",
      color: color2,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "li",
      type: "query",
      color: color4,
      displayLabel: false,
      displayLines: false,
      displayOverlay: false,
    },
    {
      query: "svg",
      type: "query",
      color: color3,
      displayLabel: false,
      displayLines: false,
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
