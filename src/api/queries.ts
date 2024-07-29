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
export const useCreateEntity = <TEntityRead, TEntityWrite>({
    entity,
    options,
    query,
    requiresToken,
}: {
    entity: api.TApiEndPoints;
    options?: Omit<UseMutationOptions<TEntityRead, unknown, TEntityWrite, unknown>, 'mutationFn'> | undefined;
    query?: Record<string, string>;
    requiresToken: boolean;
}) => {
    const queryClient = useQueryClient();

    const { mutate: handleCreateEntity, ...rest } = useMutation<
        TEntityRead,
        unknown,
        TEntityWrite,
        unknown
    >(
        async (data: TEntityWrite | TEntityWrite[]) => {
            const result = await api.create<TEntityRead, TEntityWrite>(entity, data, query, requiresToken);
            return result as TEntityRead;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(entity);
            },
            onError: (error: unknown) => {
                console.log(`${entity} Error`, { error });
            },
            ...options,
        }
    );

    return { handleCreateEntity, ...rest };
};


