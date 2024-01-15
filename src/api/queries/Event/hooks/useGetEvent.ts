import {useQuery} from '@tanstack/react-query';
import {EventKeys} from '../EventKeys';
import {EventService} from '@app/api/services/Event/EventService';
import {EventDTO} from '@app/api/models/Event/Event';
import {WrappedQueryOptions} from '@app/api/models/queryOptions/QueryOptions';

type useGetEventProps = {
  eventId: EventDTO['id'];
  queryOptions?: WrappedQueryOptions<EventDTO>;
};

const useGetEvent = ({eventId, ...queryOptions}: useGetEventProps) => {
  return useQuery({
    ...queryOptions,
    queryKey: EventKeys.event(eventId),
    queryFn: () => EventService.getEvent(eventId),
  });
};

export {useGetEvent};
