
export function buildQueryParams(options: any): string { // TODO - Type
    let params = [];
    for (const key in options) {
        if (options.hasOwnProperty(key) && options[key]) {
            if (typeof options[key] === 'object') {
                for (const subKey in options[key]) {
                    if (options[key].hasOwnProperty(subKey) && options[key][subKey]) {
                        params.push(`${encodeURIComponent(key)}[${encodeURIComponent(subKey)}]=${encodeURIComponent(options[key][subKey])}`);
                    }
                }
            } else {
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`);
            }
        }
    }
    return params.join('&');
}
