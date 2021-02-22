const checkDuplicateValue = (stars, callBack) => {
    const arr = stars.split(', ');
    if (new Set(arr).size !== arr.length) {
        const error_message = 'error -> stars string have a duplicate actor name'
        return callBack({
            success: false,
            error_message
        });
    }
    return callBack({
        success: true
    });
}

module.exports = {
    checkDuplicateValue
};