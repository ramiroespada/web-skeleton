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

    if (style.getPropertyValue("visibility") == "hidden") {
      return false;
    }

    return true;
  };

  const createLabel = (
    content,
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
    label.style.letterSpacing = "2px";
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
        if (displayOverlay || displayLabel) {
          if (overlayTarget == "parent") {
            overlayTargetElement = target.parentElement;
            setRelativePosition(overlayTargetElement);
          } else {
            overlayTargetElement = target;
          }
        }

        if (displayLabel && !displayOverlay) {
          label = createLabel(
            type == "className" ? kebabize(query) : query,
            "0px",
            "auto",
            "auto",
            "-1px",
            "translateY(-100%)",
            false
          );
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
          line.style.left = "calc(100% + 1px)";
          line.style.width = "100vw";
          line.style.height = "1px";
          line.style.background = color6;
          line.style.pointerEvents = "none";
          line.style.zIndex = 999;
          target.appendChild(line);

          line = document.createElement("div");
          line.classList.add("web-skeleton-line-top");
          line.style.position = "absolute";
          line.style.top = "-1px";
          line.style.left = "calc(-100vw - 1px)";
          line.style.width = "100vw";
          line.style.height = "1px";
          line.style.background = color6;
          line.style.pointerEvents = "none";
          line.style.zIndex = 999;
          target.appendChild(line);

          line = document.createElement("div");
          line.classList.add("web-skeleton-line-bottom");
          line.style.position = "absolute";
          line.style.top = "100%";
          line.style.left = "calc(100% + 1px)";
          line.style.width = "100vw";
          line.style.height = "1px";
          line.style.background = color6;
          line.style.pointerEvents = "none";
          line.style.zIndex = 999;
          target.appendChild(line);

          line = document.createElement("div");
          line.classList.add("web-skeleton-line-bottom");
          line.style.position = "absolute";
          line.style.top = "100%";
          line.style.left = "calc(-100vw - 1px)";
          line.style.width = "100vw";
          line.style.height = "1px";
          line.style.background = color6;
          line.style.pointerEvents = "none";
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

        target.classList.add("web-skeleton");
        target.style.outline = "1px " + color + " solid";

        if (query == "svg") {
          target.classList.add("web-skeleton-svg");
          style = window.getComputedStyle(target);
          target.setAttribute("web-skeleton-svg-bg", style.backgroundColor);
          target.style.backgroundColor = overlayColor;
        }

        if (query == "figure") {
          target.classList.add("web-skeleton-figure");
          style = window.getComputedStyle(target);
          target.setAttribute("web-skeleton-figure-bg", style.backgroundColor);
          target.style.backgroundColor = overlayColor;
        }
      }
    }
  };

  const removeElementsByClass = (name, isParent, query) => {
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
  };

  const removeDebugDecoration = () => {
    removeElementsByClass("web-skeleton-svg", false, "svg");
    removeElementsByClass("web-skeleton-figure", false, "figure");
    removeElementsByClass("web-skeleton", false, false);
    removeElementsByClass("web-skeleton-overlay", true, false);
    removeElementsByClass("web-skeleton-label", true, false);
    removeElementsByClass("web-skeleton-line-top", true, false);
    removeElementsByClass("web-skeleton-line-bottom", true, false);
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
            Math.round(size.width) + " X " + Math.round(size.height);
        }
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
      content += "&nbsp;" + vw + " X " + vh;
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
        viewportLabel = body.getElementsByClassName(
          "web-skeleton-viewport-label"
        )[0];
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
            element.overlayColor ? element.overlayColor : color5,
            element.displayLabel ? element.displayLabel : false,
            element.displayLines ? element.displayLines : false,
            element.displayOverlay ? element.displayOverlay : false,
            element.overlayTarget ? element.overlayTarget : "self"
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
    },
    {
      query: "h1",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: true,
    },
    {
      query: "h2",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: true,
    },
    {
      query: "h3",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: true,
    },
    {
      query: "h4",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: true,
    },
    {
      query: "h5",
      type: "query",
      color: color3,
      displayLabel: true,
    },
    {
      query: "h6",
      type: "query",
      color: color3,
      displayLabel: true,
    },
    {
      query: "h7",
      type: "query",
      color: color3,
      displayLabel: true,
    },
    {
      query: "h8",
      type: "query",
      color: color3,
      displayLabel: true,
    },
    {
      query: "p",
      type: "query",
      color: color3,
      displayLabel: true,
      displayLines: true,
    },
    {
      query: "a",
      type: "query",
      color: color4,
    },
    {
      query: "button",
      type: "query",
      color: color3,
    },
    {
      query: "img",
      type: "query",
      color: color3,
      overlayColor: color6,
      displayLabel: true,
      displayOverlay: true,
      overlayTarget: "parent",
    },
    {
      query: "video",
      type: "query",
      color: color3,
    },
    {
      query: "figure",
      type: "query",
      color: color3,
      overlayColor: color6,
    },
    {
      query: "canvas",
      type: "query",
      color: color2,
      overlayColor: color6,
      displayOverlay: true,
      overlayTarget: "parent",
    },
		{
      query: "svg",
      type: "query",
      color: color4,
      overlayColor: color6,
    },
    {
      query: "wrapper",
      type: "contains",
      color: color4,
    },
    {
      query: "item",
      type: "contains",
      color: color4,
    },
    {
      query: "container",
      type: "contains",
      color: color4,
    },
		{
      query: "content",
      type: "contains",
      color: color4,
    },
    {
      query: "badge",
      type: "className",
      color: color4,
    },
    {
      query: "row",
      type: "contains",
      color: color4,
    },
    {
      query: "column",
      type: "contains",
      color: color4,
    },
    {
      query: "quote",
      type: "contains",
      color: color4,
    },
    {
      query: "text",
      type: "contains",
      color: color4,
    },
    {
      query: "txt",
      type: "contains",
      color: color4,
    },
    {
      query: "col",
      type: "contains",
      color: color4,
    },
    {
      query: "headline",
      type: "contains",
      color: color4,
    },
    {
      query: "inlineCompareWrap",
      type: "className",
      color: color4,
    },
    {
      query: "card",
      type: "className",
      color: color3,
    },
    {
      query: "section",
      type: "className",
      color: color2,
    },
    {
      query: "small",
      type: "query",
      color: color3,
    },
    {
      query: "li",
      type: "query",
      color: color3,
    },
    {
      query: "form",
      type: "query",
      color: color3,
    },
		{
      query: "tr",
      type: "query",
      color: color6,
    },
		{
      query: "td",
      type: "query",
      color: color7,
    },
		{
      query: "strong",
      type: "query",
      color: color7,
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
