const createBooking = async (req, res) => {
    try{
        
    }catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}