const checkValidYear = (release_year, callBack) => {
    const min = 1850;
    const max = 2021;
    if (release_year < min || release_year > max) {
        const error_message = `error -> value of release_year = ${release_year}, should be more ${min} but less than ${max}`
        return callBack({
            success: false,
            error_message
        });
    }
    return callBack({
        success: true
    })
}
module.exports = {
    checkValidYear
};