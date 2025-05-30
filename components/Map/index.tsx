"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import styles from "./page.module.css";

interface YMaps {
  Map: new (
    id: string,
    options: { center: number[]; zoom: number; controls: string[] }
  ) => YMapInstance;
  Placemark: new (
    coordinates: number[],
    properties: { hintContent: string; balloonContent: string },
    options: { preset: string }
  ) => YPlacemarkInstance;
  ready: (callback: () => void) => void;
}

interface YMapInstance {
  geoObjects: { add: (placemark: YPlacemarkInstance) => void };
  events: { add: (event: string, handler: (e: Event) => void) => void };
  options: { set: (key: string, value: boolean) => void };
  destroy: () => void;
}

interface YPlacemarkInstance {}

declare global {
  interface Window {
    ymaps: YMaps;
  }
}

const MapComponent: React.FC = () => {
  const [activeMap, setActiveMap] = useState<number>(1);
  const [mapsReady, setMapsReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const map1Ref = useRef<YMapInstance | null>(null);
  const map2Ref = useRef<YMapInstance | null>(null);

  const coordsKazan: number[] = [55.774897, 49.20451];
  const coordsNovosibirsk: number[] = [55.027237, 82.966504];

  const handleMapChange = (mapNumber: number): void => {
    setActiveMap(mapNumber);
  };

  useEffect(() => {
    if (mapsReady && window.ymaps) {
      try {
        const map1: YMapInstance = new window.ymaps.Map("map1", {
          center: coordsKazan,
          zoom: 15,
          controls: [],
        });

        const placemark1: YPlacemarkInstance = new window.ymaps.Placemark(
          coordsKazan,
          {
            hintContent: "LIMAUDIO",
            balloonContent: "г. Казань, ул. Бухарская, д. 32 к2",
          },
          {
            preset: "islands#redDotIcon",
          }
        );

        map1.geoObjects.add(placemark1);
        map1.events.add("contextmenu", (e: Event) => e.preventDefault());
        map1.options.set("yandexMapDisablePoiInteractivity", true);

        const map2: YMapInstance = new window.ymaps.Map("map2", {
          center: coordsNovosibirsk,
          zoom: 15,
          controls: [],
        });

        const placemark2: YPlacemarkInstance = new window.ymaps.Placemark(
          coordsNovosibirsk,
          {
            hintContent: "LIMAUDIO",
            balloonContent: "г. Новосибирск, ул. Гаранина, д. 15",
          },
          {
            preset: "islands#redDotIcon",
          }
        );

        map2.geoObjects.add(placemark2);
        map2.events.add("contextmenu", (e: Event) => e.preventDefault());
        map2.options.set("yandexMapDisablePoiInteractivity", true);
        map1Ref.current = map1;
        map2Ref.current = map2;
        return () => {
          map1.destroy();
          map2.destroy();
        };
      } catch (err: unknown) {
        setError(
          "Failed to initialize Yandex Maps: " +
            (err instanceof Error ? err.message : String(err))
        );
      }
    }
  }, [mapsReady]);

  return (
    <>
      <Script
        src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"
        strategy="afterInteractive"
        onLoad={() => window.ymaps.ready(() => setMapsReady(true))}
        onError={() => setError("Failed to load Yandex Maps API")}
      />
      <div className={styles.contactsMap}>
        {error && <div className={styles.error}>{error}</div>}
        <div
          id="map1"
          className={`${styles.mapContainer} ${
            activeMap === 1 ? styles.active : ""
          }`}
        />
        <div
          id="map2"
          className={`${styles.mapContainer} ${
            activeMap === 2 ? styles.active : ""
          }`}
        />
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tabButton} ${
              activeMap === 1 ? styles.active : ""
            } ${styles.text20}`}
            onClick={() => handleMapChange(1)}
          >
            г. Казань, ул. Бухарская, д. 32 к2
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${
              activeMap === 2 ? styles.active : ""
            } ${styles.text20}`}
            onClick={() => handleMapChange(2)}
          >
            г. Новосибирск, ул. Гаранина, д. 15
          </button>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
