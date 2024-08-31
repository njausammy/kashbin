import { useEffect, useState } from 'react';
import { usePathname } from 'expo-router';


const useActiveRoute = () => {
    const path = usePathname();
    const [activeRoute, setActiveRoute] = useState('');

    useEffect(() => {
        // Split the pathname into an array of path names
        const names = path.split('/').filter(name => name !== ''); // Remove empty segments

        // Set the last path name from the array as active route
        if (names.length > 0) {
            setActiveRoute(names[names.length - 1]); // Get the last element in the array
        }
    }, [path]);

    return activeRoute; 
};

export default useActiveRoute;
