export interface Coordinates {
  lat: number;
  long: number;
}

export type ParsedCoordinates = { coords: Coordinates | null } | { error: string };

function toNumber(value: unknown): number | null | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string") {
    if (value.trim() === "") return undefined;
    value = Number(value);
  }
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/**
 * Coerces request-body lat/long to numbers so locations never store them as
 * strings (string coords are skipped by the screens map and the geo_point
 * 2dsphere index). Both blank -> { coords: null }; one blank, unparseable or
 * out of range -> { error }.
 */
export function parseCoordinates(lat: unknown, long: unknown): ParsedCoordinates {
  const parsedLat = toNumber(lat);
  const parsedLong = toNumber(long);

  if (parsedLat === undefined && parsedLong === undefined) return { coords: null };
  if (parsedLat == null || parsedLong == null) {
    return { error: "lat and long must both be valid numbers" };
  }
  if (parsedLat < -90 || parsedLat > 90 || parsedLong < -180 || parsedLong > 180) {
    return { error: "lat/long out of range" };
  }
  // 0,0 is a placeholder some imports wrote, not a real location.
  if (parsedLat === 0 && parsedLong === 0) return { coords: null };
  return { coords: { lat: parsedLat, long: parsedLong } };
}

/** GeoJSON point for the locations.geo_point 2dsphere index (note: [long, lat]). */
export function toGeoPoint({ lat, long }: Coordinates) {
  return { type: "Point" as const, coordinates: [long, lat] };
}
