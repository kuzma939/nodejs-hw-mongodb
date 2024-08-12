// eslint-disable-next-line no-unused-vars
export const notFoundHandler = (reg, res, next) => {
    res.status(404).json({
        message: 'Route not found',
    })
}