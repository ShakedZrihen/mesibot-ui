import QueryString from 'query-string';
import _ from 'lodash';

export const omitFromQs = (
    qsParamName,
    search = QueryString.parse(window.location.search, {
        ignoreQueryPrefix: true
    })
) => {
    const paramValue = _.get(search, qsParamName);
    const newSearchString = `${QueryString.stringify(
        _.omit(search, [qsParamName])
    )}`;
    window.history.replaceState(
        {},
        document.title,
        `${window.location.pathname}${newSearchString ? `?${newSearchString}` : ''}`
    );
    return paramValue;
}