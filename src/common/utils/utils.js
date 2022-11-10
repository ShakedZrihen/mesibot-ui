import QueryString from 'query-string';
import _ from 'lodash';
import history from '../../routes/history';

export const LOCAL_STORAGE_KEYS = {
  SLACK_AUTH_QS: 'userSlackId',
  LAST_PATHNAME: 'lastPathname',
  CODE: 'code'
};

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
};

export const getPlaylistIdFromUrl = () => {
  const pathnameArr = history.location.pathname.split('/');
  const route = _.get(pathnameArr, '[1]');
  const playlistId = _.get(pathnameArr, '[2]');
  if (route === 'playlist') return playlistId;
};
