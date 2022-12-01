### Motivation

Most of the Redux codebase serves the purpose of calling APIs, store the fetched data and select it with `loading` and `error` properties in order to update the UI through the fetching process.

The Query middleware aim to reduce most of that boilerplate while adding some incrementaly adoptable features like data caching.

Some existing libraries like **RTK Query** or **React Query** are offering similar and more advanced features, but are either not suitable with current implementation of MyDP Services or would increase the amout/weight of MyDP dependencies without offering significant advantage.

### Usage

#### React Hook

A React hook can easily be implemented to query, mutate and select data from the Query middleware. Here is a sample of implementation :

    import { useEffect } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { RootState } from '.';
    import {
    	select,
    	getFetchAction,
    	getMutationAction,
    	ServiceName,
    	Services,
    } from '../../mydp-frontend-services/dist/store/query';

    export function useQuery<T extends ServiceName, U extends Parameters<Services[T]>>(params: {
    	service: T;
    	args?: U;
    	cacheKey?: string;
    }) {
    	const { service, args, cacheKey } = params;
    	const data = useSelector((state: RootState) => select(state.query)({ service, args, cacheKey }));
    	const dispatch = useDispatch();

    	const fetch = () => dispatch(getFetchAction({ service, args, cacheKey }));
    	const mutate =
    		data?.content &&
    		(<X extends ServiceName, Y extends Parameters<Services[X]>>(mutationParams: {
    			service?: X;
    			args?: Y;
    			callback?: (params: {
    				response: Awaited<ReturnType<Services[X]>>;
    				state: Awaited<ReturnType<Services[T]>>['response'];
    			}) => Partial<Awaited<ReturnType<Services[T]>>['response']>;
    		}) =>
    			dispatch(
    				getMutationAction({
    					service: mutationParams.service,
    					args: mutationParams.args,
    					callback: mutationParams.callback,
    					mutatedDataParams: { service, args, cacheKey },
    				}),
    			));

    	useEffect(() => {
    		if (data == null) fetch();
    	}, [data]);

    	return {
    		data: data?.content,
    		loading: data?.loading,
    		error: data?.error,
    		refetch: fetch,
    		mutate,
    	};
    }

#### Data fetching

The `getFetchAction` action creator takes 3 arguments :

- `service` : the name of the service we want to use, from the collection of Services exposed by the MyDP Shared Services project.
- `args` : the arguments needed by the selected service to get needed data
- `cacheKey` (optional) : the key we want to use to store the fetched data in (if not provided, this middleware will use a hashed value of the service name and the provided args, in order to be able to cache the fetched data, as long the query parameters stay the same)

Once dispatched, the Query middleware will populate the store with the following structure :

    {
    	[serviceName]: {
    		[cacheKey]: {
    			error: string;
    			content: ReturnType<Service>
    			loading: boolean;
    		}
    	}
    }

The purpose of the optional cacheKey is to be able to select fetched data without the need to be aware of the originaly used query params.

For example, we can fetch a list of filtered items at one place (like "last 5 unread messages") to display a visual hint, and then effectively display those same already fetched items, as long as they both use the same cache key (like "last5unreadMessages").

#### Data mutation

The `getMutationAction` action creator is behaving mostly the same way as the `getFetchAction` but takes 2 more arguments :

- `mutatedDataParams` : an object containing the original arguments (`service`, `args`, `cacheKey`) used to fetch the data we want to mutate. Those are used to update the right items in the store.
- `callback` : a function that is taking two parameters, the actual state of the mutated item and the response of the mutation called service. That function must return a partial item content that will be deepmerged with the existing one in the store.

### Enhancements

- We should keep the lastFetched and lastUpdated dates in stored data in order to optimize caching strategy.
