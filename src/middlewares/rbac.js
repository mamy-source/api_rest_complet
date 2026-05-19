const roleLevel = {
    rh: 1,
    admin: 2,
    candidate: 3
};

export const allowRole = (minRole) =>{
    return (req, res, next) => {
        const roleValue = req.user.role;

        if (!roleLevel[roleValue]) {
        return res.status(403).json({
            message: "Role not found",
        });

        }
        if (roleLevel[roleValue] < roleLevel[minRole]) {
            return res.status(403).json({ error: "Access denied" });
        }
        next()
    };
};