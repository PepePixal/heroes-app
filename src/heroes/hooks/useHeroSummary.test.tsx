import type { PropsWithChildren } from "react";
import { describe, expect, test } from "vitest";
import { renderHook } from '@testing-library/react';
import { useHeroSummary } from "./useHeroSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const tanStackCustomProvider = () => {
    const queryClent = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });

    return ({children}: PropsWithChildren) => (
        <QueryClientProvider client={queryClent}>{children}</QueryClientProvider>
    );
}

describe('useHeroSummary', () => {
    test('debe retornar el estado inicial (isLoading)', () => {
        const { result } = renderHook( () => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBe(undefined);
        expect(result.current.data).toBeUndefined();
    });
});
