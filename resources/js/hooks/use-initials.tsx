import { useCallback } from 'react';

export function useInitials() {
    return useCallback((firstName: string, lastName: string): string => {
        const firstInitial = firstName && firstName.charAt(0) || 'A';
        const lastInitial = lastName && lastName.charAt(0) || 'A';

        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);
}
