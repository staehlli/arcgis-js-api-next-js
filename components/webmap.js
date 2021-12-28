import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Legend from "@arcgis/core/widgets/Legend";

import React, { useEffect, useState } from "react";

export default function Map({ portalItemId }) {
  const [viewLoaded, setViewLoaded] = useState(false);
  const viewRef = React.createRef();

  async function loadMap() {
    if (viewRef.current) {
      const webmap = new WebMap({
        portalItem: {
          id: portalItemId,
        },
      });

      console.log(viewRef.current.id);
      const view = new MapView({
        map: webmap,
        container: viewRef.current.id,
      });

      view.when(() => {
        const legend = new Legend({
          view: view,
        });

        view.ui.add(legend, "bottom-right");
      });
    }
  }

  useEffect(async () => {
    if (!viewLoaded) {
      await loadMap();
      setViewLoaded(true);
    }
  }, []);

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      id="viewDiv"
      ref={viewRef}
    ></div>
  );
}
