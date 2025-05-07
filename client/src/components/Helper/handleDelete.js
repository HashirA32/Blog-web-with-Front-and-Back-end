export const deleteData = async (endPoint) => {
    const c = confirm("Are you sure you want to delete this category?");
    if (!c) {
        return false;
    }

    try {
        const response = await fetch(endPoint, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!response.ok) {
            // If the server responded with a non-OK status, throw an error with details
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        // Only try to parse JSON if the response is OK
        const data = await response.json();
        console.log('Delete successful:', data);

        return true;
    } catch (error) {
        console.error('Delete failed:', error);
        return false;
    }
};
