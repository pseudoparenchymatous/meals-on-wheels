import { useCallback } from 'react';

export function useInitials() {
    return useCallback((name: string): string => {
        const [firstName, lastName] = name.split(' ');
        const firstInitial = firstName && firstName.charAt(0) || 'A';
        const lastInitial = lastName && lastName.charAt(0) || 'A';

        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);
}
