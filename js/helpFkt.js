class ObjectUtils {
    static isEmpty(AObj) {
        for (let key in AObj) {
            if (Object.prototype.hasOwnProperty.call(AObj, key)) {
                return false;
            }
        }
        return true;
    }
}