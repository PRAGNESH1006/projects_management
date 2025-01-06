/* eslint-disable */
import { useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import moment from 'moment';

export const { route } = window;

export function classNames(...n) {
  return n.filter(Boolean).join(' ');
}

export function isCurrentRoute(page) {
  return route().current(page);
}

export function getParentOfCurrentRoute(nav) {
  let foundParent = undefined;
  Object.entries(nav).forEach(items => {
    let tempParent = items[1].find(
      item =>
        item.children &&
        item.children.some(childItem => isCurrentRoute(childItem.active_route))
    );
    foundParent = typeof tempParent !== 'undefined' ? tempParent : undefined;
  });
  return foundParent;
}

export function isParentOfCurrentRoute(nav, route) {
  let foundParent = getParentOfCurrentRoute(nav);
  return (
    typeof foundParent !== 'undefined' && foundParent.active_route === route
  );
}

// for checking if this is first mount
export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export const submitFilterQuery = (query, data = {}) => {
  if (Object.keys(data).length > 0) {
    router.get(route(route().current(), data), query, {
      preserveState: true,
      replace: true,
    });
  } else {
    router.get(route(route().current()), query, {
      preserveState: true,
      replace: true,
    });
  }
};

export const filterEmptyObjectValues = query => {
  let filtersQuery = {};
  Object.entries(query).forEach(val => {
    if (val[1].length > 0) {
      filtersQuery[val[0]] = val[1];
    }
  });
  return filtersQuery;
};

export function isJson(str) {
  try {
    if (str !== '') {
      JSON.parse(str);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

export function toTitleCase(str) {
  if (typeof str === 'undefined') {
    return '';
  }
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.slice(0, 1) + x.slice(1))
    .join(' ');
}

export function formatDate(str) {
  if (typeof str === 'undefined') {
    return '';
  }
  return moment(str).format('MMM Do Y');
}
