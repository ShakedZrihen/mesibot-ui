import QueryString from 'query-string';
import _ from 'lodash';

export const LOCAL_STORAGE_KEYS = {
    SLACK_AUTH_QS: 'userSlackId',
    LAST_PATHNAME: 'lastPathname'
}

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