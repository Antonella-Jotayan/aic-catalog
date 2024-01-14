type Params = Record<string, string | number | string[]>;

function normalizeRoute(route: string, obj: Params) {
  const keys = Object.keys(obj);
  keys.forEach(key => {
    route = route.replace(`{${key}}`, obj[key].toString());
  });
  return route;
}

export {normalizeRoute};
