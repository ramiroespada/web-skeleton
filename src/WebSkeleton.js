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

  const isDebug = false;
  const color1 = "rgb(222,0,255)";
  const color2 = "rgba(222,0,255,0.7)";
  const color3 = "rgba(222,0,255,0.6)";
  const color4 = "rgba(222,0,255,0.5)";
  const color5 = "rgba(222,0,255,0.4)";
  const color6 = "rgba(222,0,255,0.2)";
  const color7 = "rgba(222,0,255,0.1)";

  const colors = [color1, color2, color3, color4, color5, color6, color7];

  const colorTest = "rgba(0, 0, 255, 1)";

  let labels = 0;
  let outlines = 0;
  let overlays = 0;
  let lines = 0;

  const isElementVisible = (target, query) => {
    if (target.classList.contains("visuallyhidden")) {
      return false;
    }

    let size = target.getBoundingClientRect();

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
      if (size.width <= 10 || size.height <= 10) return false;
    }

    style = window.getComputedStyle(target);
    if (style.getPropertyValue("display") == "none") {
      return false;
    }

    if (query == "container" || query == "content" || query == "wrapper") {
      if (size.width <= 22 || size.height <= 60) return false;
    }

    if (query != "img" || query != "svg") {
      return true;
    }

    if (style.getPropertyValue("visibility") == "hidden") {
      return false;
    }

    return true;
  };

  const createLabel = (
    query,
    isParent,
    position // TL, TC, TR
  ) => {
    let label = document.createElement("div");
    label.classList.add("web-skeleton");
    label.classList.add("web-skeleton-label");
    if (isParent) {
      label.classList.add("web-skeleton-label-parent");
    } else {
      label.classList.add("web-skeleton-label-self");
    }

    let top = "0px";
    let left = "0px";
    let bottom = "auto";
    let right = "auto";
    let tX = "translateX(0)";
    let tY = "translateY(0)";

    if (position.slice(0, 1) == "T" && position.slice(2, 3) == "O") {
      tY = "translateY(-100%)";
    }

    if (position.slice(0, 1) == "B") {
      top = "auto";
      bottom = "-1px";
    }

    if (position.slice(0, 1) == "C") {
      top = "50%";
      bottom = "auto";
      tY = "translateY(-50%)";
    }

    if (position.slice(1, 2) == "R") {
      left = "auto";
      right = "-1px";
    }

    if (position.slice(1, 2) == "C") {
      left = "50%";
      right = "auto";
      tX = "translateX(-50%)";
    }
    let transform = tX + " " + tY;

    let text = document.createTextNode(query);
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
    label.style.lineHeight = "8px";
    label.style.textTransform = "none";
    label.style.color = "white";
    label.style.background = color1;
    label.style.padding = "4px";
    label.style.margin = "0px";
    label.style.pointerEvents = "none";
    label.style.textAlign = "left";
    label.style.overflow = "hidden";
    label.style.transform = transform;
    label.style.whiteSpace = "nowrap";
    label.style.filter = "none";
    label.style.webkitTextFillColor = "white";
    label.style.outline = "none";
    label.style.zIndex = 999;
    label.appendChild(text);

    if (isDebug) {
      labels++;
    }

    return label;
  };

  const setRelativePosition = (element) => {
    const style = window.getComputedStyle(element);
    const position = style.getPropertyValue("position");
    if (position != "sticky" && position != "absolute" && position != "fixed") {
      element.classList.add("web-skeleton");
      element.classList.add("web-skeleton-relative");
      element.setAttribute("web-skeleton-position", position);
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

    domElements.forEach((target) => {
      updatePosition = false;
      isVisible = isElementVisible(target, query);

      if (String(target.tagName).toLowerCase() == "span") {
        displayLabel = false;
      }

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
          if (query == "section" || query == "container" || query == "footer") {
            const position = style.getPropertyValue("position");
            if (position != "static") {
              label = createLabel(
                type == "className" ? kebabize(query) : query,
                false,
                "TLI"
              );
              updatePosition = true;
            }
          } else if (
            query == "p" &&
            style.getPropertyValue("display") == "inline"
          ) {
            // Skip p elements set to display inline, since the labels don't look good there.
          } else if (query == "content") {
            label = createLabel(
              type == "className" ? kebabize(query) : query,
              false,
              "TRI"
            );
            updatePosition = true;
          } else if (
            query == "h1" ||
            query == "h2" ||
            query == "h3" ||
            query == "h4" ||
            query == "h5" ||
            query == "h6" ||
            query == "h7"
          ) {
            label = createLabel(
              type == "className" ? kebabize(query) : query,
              false,
              "TR"
            );
            updatePosition = true;
          } else {
            label = createLabel(
              type == "className" ? kebabize(query) : query,
              false,
              "BR"
            );
            updatePosition = true;
          }
          if (label) {
            overlayTargetElement.appendChild(label);
          }
        }

        if (
          displayLines &&
          target.getElementsByClassName("web-skeleton-line-top").length <= 0
        ) {
          line = document.createElement("div");
          line.classList.add("web-skeleton");
          line.classList.add("web-skeleton-line");
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
          if (isDebug) {
            lines++;
          }

          line = document.createElement("div");
          line.classList.add("web-skeleton");
          line.classList.add("web-skeleton-line");
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
          if (isDebug) {
            lines++;
          }

          updatePosition = true;
        }

        if (
          displayOverlay &&
          overlayTargetElement.getElementsByClassName("web-skeleton-overlay")
            .length <= 0
        ) {
          overlay = document.createElement("div");
          overlay.classList.add("web-skeleton");
          overlay.classList.add("web-skeleton-overlay");
          overlay.classList.add("web-skeleton-overlay-" + overlayTarget);
          overlay.style.position = "absolute";
          overlay.style.top = "0px";
          overlay.style.left = "0px";
          overlay.style.width = "100%";
          overlay.style.height = "100%";
          overlay.style.backgroundColor = overlayColor;
          overlay.style.pointerEvents = "none";
          overlay.style.zIndex = 999;

          if (displayLabel) {
            label = createLabel(
              query,
              overlayTarget == "parent" ? true : false,
              "CC"
            );
            if (label) {
              overlay.appendChild(label);
            }
          }
          if (isDebug) {
            overlays++;
          }
          overlayTargetElement.appendChild(overlay);
        }

        if (updatePosition) {
          setRelativePosition(target);
        }

        if (style.getPropertyValue("outline-width") == "0px") {
          target.style.outline = "1px " + color + " solid";
          if (isDebug) {
            outlines++;
          }
          target.classList.add("web-skeleton");
          target.classList.add("web-skeleton-outline");
        }

        /*
				TODO: find a way to decorate breaks inside texts :nbsp:
        if (query == "p") {
          console.log(
            "RE / [WebSkeleton.js:351]: target.innerHTML: ",
            target.innerHTML
          );
          target.style.backgroundColor = "pink";
        }
				*/

        if (query == "svg") {
          target.classList.add("web-skeleton");
          target.classList.add("web-skeleton-svg");
          target.setAttribute("web-skeleton-svg-bg", style.backgroundColor);
          target.style.backgroundColor = overlayColor;
        }

        if (query == "figure") {
          target.classList.add("web-skeleton");
          target.classList.add("web-skeleton-figure");
          target.setAttribute("web-skeleton-figure-bg", style.backgroundColor);
          target.style.backgroundColor = overlayColor;
        }
      }
    });
  };

  const removeDebugDecoration = () => {
    let domElements = Array.from(
      document.getElementsByClassName("web-skeleton")
    );

    domElements.forEach((target) => {
      if (target.classList.contains("web-skeleton-outline")) {
        if (isDebug) {
          outlines++;
        }
        target.style.outline = "none";
      }
      if (target.classList.contains("web-skeleton-svg")) {
        target.style.backgroundColor = target.getAttribute(
          "web-skeleton-svg-bg"
        );
        target.removeAttribute("web-skeleton-svg-bg");
      }
      if (target.classList.contains("web-skeleton-figure")) {
        target.style.backgroundColor = target.getAttribute(
          "web-skeleton-figure-bg"
        );
        target.removeAttribute("web-skeleton-figure-bg");
      }
      if (target.classList.contains("web-skeleton-relative")) {
        target.style.position = target.getAttribute("web-skeleton-position");
      }
      target.removeAttribute("web-skeleton-position");
      if (target.classList.contains("web-skeleton-label")) {
        try {
          if (isDebug) {
            labels++;
          }
          target.parentElement.removeChild(target);
        } catch (e) {}
      }
      if (target.classList.contains("web-skeleton-line")) {
        try {
          if (isDebug) {
            lines++;
          }
          target.parentElement.removeChild(target);
        } catch (e) {}
      }
      if (target.classList.contains("web-skeleton-overlay")) {
        try {
          if (isDebug) {
            overlays++;
          }
          target.parentElement.removeChild(target);
        } catch (e) {}
      }
    });
    domElements = Array.from(document.getElementsByClassName("web-skeleton"));
    domElements.forEach((element) => {
      element.classList.remove("web-skeleton");
      element.classList.remove("web-skeleton-outline");
      element.classList.remove("web-skeleton-svg-bg");
      element.classList.remove("web-skeleton-svg");
      element.classList.remove("web-skeleton-figure");
      element.classList.remove("web-skeleton-label");
      element.classList.remove("web-skeleton-label-parent");
      element.classList.remove("web-skeleton-label-self");
      element.classList.remove("web-skeleton-relative");
      element.classList.remove("web-skeleton-line");
      element.classList.remove("web-skeleton-line-top");
      element.classList.remove("web-skeleton-line-bottom");
      element.classList.remove("web-skeleton-overlay");
      element.classList.remove("web-skeleton-overlay-parent");
      element.classList.remove("web-skeleton-overlay-self");
    });
  };

  const updateOverlaysLabel = () => {
    const domElements = Array.from(
      document.getElementsByClassName("web-skeleton-overlay-parent")
    );
    domElements.forEach((target) => {
      target.style.top = "0px";
      target.style.left = "0px";
      target.style.width = "100%";
      target.style.height = "100%";
      let container = target.parentElement;
      let label = target.getElementsByClassName("web-skeleton-label-parent")[0];
      let child = container.querySelectorAll("img")[0];
      if (!child) {
        child = container.querySelectorAll("svg")[0];
      }
      let childSize = null;
      let containerSize = container.getBoundingClientRect();
      if (child) {
        childSize = child.getBoundingClientRect();
      }
      if (label) {
        if (containerSize.width <= 1 || containerSize.height <= 1) {
          label.style.visibility = "hidden";
        } else {
          label.style.visibility = "visible";
          let style = window.getComputedStyle(container);
          if (childSize && style.getPropertyValue("width") == "auto") {
            target.style.top = Math.round(childSize.y - containerSize.y) + "px";
            target.style.left =
              Math.round(childSize.x - containerSize.x) + "px";
            target.style.width = childSize.width + "px";
            target.style.height = childSize.height + "px";
            label.textContent =
              Math.round(childSize.width) +
              " x " +
              Math.round(childSize.height);
          } else {
            label.textContent =
              Math.round(containerSize.width) +
              " x " +
              Math.round(containerSize.height);
          }
        }
      }
    });
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
      content += "&nbsp;" + vw + " x " + vh;
      label.innerHTML = content;
    }
  };

  const onResizeHandler = () => {
    updateViewportLabel();
    updateOverlaysLabel();
  };

  const printDebugInfo = (state, startDate) => {
    const endDate = new Date();
    const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log("RE / INFO " + state);
    console.log("RE / total labels: " + labels);
    console.log("RE / total outlines: " + outlines);
    console.log("RE / total overlays: " + overlays);
    console.log("RE / total lines: " + lines);
    console.log("RE / seconds: " + seconds);
    console.log(" ");
  };

  const toggleDecorations = (elements) => {
    const startDate = new Date();
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
      removeDebugDecoration();
      if (isDebug) {
        printDebugInfo("REMOVE", startDate);
      }
      return;
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
    if (isDebug) {
      labels = 0;
      outlines = 0;
      overlays = 0;
      lines = 0;
    }
    elements.forEach((element) => {
      let domElements;
      if (element.type == "query") {
        domElements = Array.from(document.querySelectorAll(element.query));
      }
      if (element.type == "className") {
        domElements = Array.from(
          document.getElementsByClassName(kebabize(element.query))
        );
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
      }
    });

    updateOverlaysLabel();
    if (isDebug) {
      printDebugInfo("ADD", startDate);
    }
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
      color: 3,
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
      query: "copy",
      type: "contains",
      color: 4,
    },
    {
      query: "caption",
      type: "contains",
      color: 4,
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
      query: "logo",
      type: "contains",
      color: 4,
    },
    {
      query: "wrapper",
      type: "contains",
      color: 4,
    },
    {
      query: "holder",
      type: "contains",
      color: 4,
    },
    {
      query: "item",
      type: "contains",
      color: 4,
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
      color: 3,
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
      query: "title",
      type: "contains",
      color: 5,
    },
    {
      query: "tile",
      type: "contains",
      color: 4,
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
      color: 4,
    },
    {
      query: "form",
      type: "query",
      color: 4,
    },
    {
      query: "form",
      type: "contains",
      color: 4,
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
      color: 5,
    },
    {
      query: "footer",
      type: "query",
      color: 3,
      displayLabel: false,
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

  const onlyP = [
    {
      query: "p",
      type: "query",
      color: 3,
      displayLabel: true,
      displayLines: true,
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
