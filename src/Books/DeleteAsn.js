
import 'bootstrap/dist/css/bootstrap.min.css';

const handleDelete = async (id, token, setAsns, asns) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/deleteasn/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                },
            });

            if (response.ok) {
                // Remove the deleted book from the state
                setAsns(asns.filter(asn => asn.id !== id));
                return 'Book deleted successfully.';
            } else {
                return 'Failed to delete the asn.';
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            return 'An error occurred. Please try again.';
        }
    }
    return null;
};

export default handleDelete;
