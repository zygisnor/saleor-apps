import type Handlebars from "handlebars";

const enc = (s: string) => encodeURIComponent(s);

type Carrier = {
  name: string;
  url: (tn: string) => string;
};

const detectCarrier = (raw: unknown): Carrier | null => {
  if (typeof raw !== "string") return null;
  const tn = raw.trim().toUpperCase();

  if (!tn) return null;

  if (/^(JJD|JVGL)/.test(tn)) {
    return {
      name: "DHL",
      url: (t) => `https://www.dhl.com/global-en/home/tracking.html?tracking-id=${enc(t)}`,
    };
  }
  if (/^[A-Z]{2}\d{9}LT$/.test(tn)) {
    return {
      name: "LP Express",
      url: (t) => `https://www.lpexpress.lt/lt/siuntu-paieska/?trackid=${enc(t)}`,
    };
  }
  if (/^\d{14}$/.test(tn)) {
    return {
      name: "DPD",
      url: (t) => `https://tracking.dpd.de/parcelstatus?query=${enc(t)}&locale=en_LT`,
    };
  }
  if (/^\d{12}$|^\d{15}$/.test(tn)) {
    return {
      name: "FedEx",
      url: (t) => `https://www.fedex.com/fedextrack/?tracknumbers=${enc(t)}`,
    };
  }
  if (/^\d{10}$/.test(tn)) {
    return {
      name: "DHL Express",
      url: (t) => `https://www.dhl.com/en/express/tracking.html?AWB=${enc(t)}`,
    };
  }

  return null;
};

export const registerCarrierHelpers = (handlebars: typeof Handlebars): void => {
  handlebars.registerHelper("carrierTrackingUrl", function (trackingNumber: unknown) {
    const carrier = detectCarrier(trackingNumber);

    return carrier ? carrier.url(String(trackingNumber).trim()) : "";
  });

  handlebars.registerHelper("carrierName", function (trackingNumber: unknown) {
    const carrier = detectCarrier(trackingNumber);

    return carrier ? carrier.name : "";
  });
};
