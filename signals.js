(function () {
  ("use strict");

  const Signals = {
    init: function (projectId) {
      this.projectId = projectId;
      this.handlePageView();
      this.handleClicks();
      this.handleMouseTracking();
    },

    handlePageView: function () {
      this.sendData({
        eventType: "pageview",
        url: window.location.href,
        timestamp: Date.now(),
      });
    },

    handleClicks: function () {
      document.addEventListener("click", (event) => {
        this.sendData({
          eventType: "click",
          element: event.target.tagName,
          x: event.clientX,
          y: event.clientY,
          timestamp: Date.now(),
        });
      });
    },

    handleMouseTracking: function () {
      let mousePositions = [];
      document.addEventListener("mousemove", (event) => {
        mousePositions.push({
          x: event.clientX,
          y: event.clientY,
          timestamp: Date.now(),
        });
      });

      setInterval(() => {
        if (mousePositions.length > 0) {
          this.sendData({
            eventType: "mousemove",
            positions: mousePositions,
            url: window.location.href,
          });
          mousePositions = [];
        }
      }, 5000);
    },

    sendData: function (data) {
      console.log("Sending...", data);
    },
  };

  window.Signals = Signals;
})();
