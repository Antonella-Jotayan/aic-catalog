import {api} from '@app/api/instances/api';
import {
  AxiosBaseApi,
  AxiosBaseApiPaginated,
} from '@app/api/models/BaseApi/BaseApi';

import type {EventDTO, FilteredEventDTO} from '@app/api/models/Event/Event';
import {normalizeRoute} from '@app/utils/normalizeRoute';

const RESOURCES = {
  GET_EVENTS:
    '/events?limit={limit}&page={page}&fields=id,image_url,title,short_description,description,location,is_ticketed,rsvp_link,is_virtual_event,start_date,end_date,start_time,end_time',
  GET_EVENT: '/events/{eventId}',
};

const getEvents = async (limit: number, page: number) => {
  const {data} = await api.get<void, AxiosBaseApiPaginated<FilteredEventDTO[]>>(
    normalizeRoute(RESOURCES.GET_EVENTS, {limit, page}),
  );

  return data;
};

const getEvent = async (eventId: number) => {
  const {data} = await api.get<void, AxiosBaseApi<EventDTO>>(
    normalizeRoute(RESOURCES.GET_EVENT, {eventId}),
  );

  return data?.data;
};

export const EventService = {
  getEvents,
  getEvent,
};
