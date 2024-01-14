import {useInfiniteQuery} from '@tanstack/react-query';
import {WrappedQueryOptions} from '@app/api/models/queryOptions/QueryOptions';
import {EventKeys} from '../EventKeys';
import {EventService} from '@app/api/services/Event/EventService';
import {FilteredEventDTO} from '@app/api/models/Event/Event';

type useGetEventsProps = {
  limit: number;
  queryOptions?: WrappedQueryOptions<FilteredEventDTO[]>;
};

const useGetEvents = ({limit, ...queryOptions}: useGetEventsProps) => {
  return useInfiniteQuery({
    queryKey: EventKeys.events,
    queryFn: ({pageParam = 0}) => EventService.getEvents(limit, pageParam),
    ...queryOptions,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const lastPageLength = lastPage.data.length;

      return lastPageLength < limit
        ? undefined
        : lastPage.pagination.current_page + 1;
    },
    select: data => {
      return data.pages.flatMap(page => page.data) || [];
    },
  });
};

export {useGetEvents};
