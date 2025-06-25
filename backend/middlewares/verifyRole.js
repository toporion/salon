
const verifyRole =(...allowedRoles) => {
    return (req, res, next)=>{
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "forbiden:you don't have access" })
        }
        next()
    }
    
}

module.exports = verifyRole;