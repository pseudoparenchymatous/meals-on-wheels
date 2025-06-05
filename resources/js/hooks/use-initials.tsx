import { useCallback } from 'react';

export function useInitials() {
    return useCallback((firstName: string, lastName: string): string => {
        const firstInitial = firstName.charAt(0);
        const lastInitial = lastName.charAt(0);

        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);
}
