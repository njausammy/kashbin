import {
    useQuery,
    useMutation,
    UseQueryOptions,
    QueryKey,
    UseMutationOptions,
    useQueryClient,
} from 'react-query';
import * as api from './api';

type TEntity = {
    id: string
};

type TEntityQuery = {
};

export const entityQueryKey = (
    entity: api.TApiEndPoints,
    id?: string,
    query?: TEntity,
): QueryKey => [entity, id, JSON.stringify(query)];

export const entitiesQueryKey = (
    entity: api.TApiEndPoints,
    query?: TEntity,
): QueryKey => [entity, JSON.stringify(query)];

// Hook to fetch a single entity
export const useGetEntity = (
    entity: api.TApiEndPoints,
    id: string,
    query?: TEntity,
) => {
    return useQuery<TEntity>(
        entityQueryKey(entity, id, query),
        () => api.get<TEntity, TEntityQuery>(entity, id, query) as Promise<TEntity>, 
        {
            enabled: Boolean(id),
        } as UseQueryOptions<TEntity, unknown, TEntity, QueryKey>,
    );
};


// Hook to fetch multiple entities
export const useGetEntities = (
    entity: api.TApiEndPoints,
    query?: TEntity,
    options?: UseQueryOptions<
        {
            limit: number;
            skip: number;
            total: number;
            data: TEntity[];
        },
        unknown,
        {
            limit: number;
            skip: number;
            total: number;
            data: TEntity[];
        },
        QueryKey
    >,
) => {
    return useQuery<
        {
            limit: number;
            skip: number;
            total: number;
            data: TEntity[];
        },
        unknown,
        {
            limit: number;
            skip: number;
            total: number;
            data: TEntity[];
        },
        QueryKey
    >(
        entitiesQueryKey(entity, query),
        () => api.getAll<TEntity, TEntityQuery>(entity, query) as Promise<{
            limit: number;
            skip: number;
            total: number;
            data: TEntity[];
        }>, // Adjust to match your API function signature
        options,
    );
};


// Hook to update an entity
export const useUpdateEntity = (
    entity: api.TApiEndPoints,
    id?: string,
    params?: TEntity,
    options?: UseMutationOptions<TEntity, unknown, Partial<TEntity>, QueryKey>,
) => {
    const queryClient = useQueryClient();

    const { mutate: handleUpdateEntity, ...rest } = useMutation<TEntity, unknown, Partial<TEntity>, QueryKey>(
        async (data: Partial<TEntity>) => {
            const updateId = data.id || id;
            if (!updateId) throw new Error(`Invalid id '${updateId}' in useUpdateEntity for service ${entity}`);
            const updatedEntity = await api.update<TEntity, Partial<TEntity>>(entity, updateId, data, params);
            if (!updatedEntity) {
                throw new Error(`Failed to update entity ${entity} with id ${updateId}`);
            }
            return updatedEntity;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([entity]);
            },
            ...options,
        },
    );

    return { handleUpdateEntity, ...rest };
};

// Hook to delete an entity
export const useDeleteEntity = (
    entity: api.TApiEndPoints,
    options?: UseMutationOptions<void, unknown, string, QueryKey>, // Adjust the options type as per the expected return type
) => {
    const queryClient = useQueryClient();

    const { mutate: handleDeleteEntity, ...rest } = useMutation<void, unknown, string, QueryKey>(
        async (id: string) => {
            await api.remove<TEntity>(entity, id); // Adjust to match your API function signature
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(entity);
            },
            ...options,
        },
    );

    return { handleDeleteEntity, ...rest };
};

// Hook to create an entity
export const useCreateEntity = (
    entity: api.TApiEndPoints,
    options?: Omit<
        UseMutationOptions<
            {
                limit: number;
                skip: number;
                total: number;
                data: TEntity[];
            },
            unknown,
            Partial<TEntity> | Partial<TEntity>[],
            QueryKey
        >,
        'queryKey' | 'queryFn'
    >,
    query?: TEntity,
    requiresToken: boolean = true,
) => {
    const queryClient = useQueryClient();

    const { mutate: handleCreateEntity, ...rest } = useMutation<
        {
            limit: number;
            skip: number;
            total: number;
            data: TEntity[];
        },
        unknown,
        Partial<TEntity> | Partial<TEntity>[],
        QueryKey
    >(
        async (data: Partial<TEntity> | Partial<TEntity>[]) => {
            const createdEntity = await api.create<TEntity, Partial<TEntity>>(entity, data, query, requiresToken); // Adjust to match your API function signature
            if (!createdEntity) {
                throw new Error(`Failed to create entity ${entity}`);
            }
            return {
                limit: 10,  // Adjust as per your response structure
                skip: 0,
                total: 1,
                data: [createdEntity],
            };
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(entity);
            },
            onError: (error: unknown) => {
                console.log(`${entity} Error`, { error });
            },
            ...options,
        },
    );

    return { handleCreateEntity, ...rest };
};
