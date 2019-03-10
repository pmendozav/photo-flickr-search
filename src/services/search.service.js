import { ATTRIBUTION_LICENSE_ID, NO_COPYRIGHT_RESTRICTIONS_ID, BASE_URL, RESULTS_PER_PAGE, SEARCH_API_METHOD, GETINFO_API_METHOD } from '../constants/common';

const encodeGetParams = (p) => {
    return Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
}

export function fetchImages(data) {
    const options = {
        method: 'GET',
        mode: 'cors'
    };

    let license = (data.license) ? [ATTRIBUTION_LICENSE_ID] : [];
    license = (!data.copyright) ? [...license, NO_COPYRIGHT_RESTRICTIONS_ID] : license;

    const paramsSearch = {
        method: SEARCH_API_METHOD,
        format: "json",
        sort: "date-taken-desc",
        nojsoncallback: 1,
        api_key: process.env.REACT_APP_API_KEY,
        tags: (data.tags && data.tags.length > 0) ? data.tags.join(',') : '',
        min_taken_date: data.dateFrom.getTime() / 1000,
        max_taken_date: data.dateTo.getTime() / 1000,
        license: (license.length > 0) ? license.join(',') : '',
        per_page: RESULTS_PER_PAGE,
        page: (data.page) ? data.page : 1,
    };

    const paramsPhotoGetInfo = {
        method: GETINFO_API_METHOD,
        format: "json",
        nojsoncallback: 1,
        api_key: process.env.REACT_APP_API_KEY
    };

    return fetch(BASE_URL + encodeGetParams(paramsSearch), options)
        .then(rawData => rawData.json())
        .then(data => {
            const totalPages = data.photos.pages;
            const promises = data.photos.photo.map(e => {
                const urlPhoto = `https://farm${e.farm}.staticflickr.com/${e.server}/${e.id}_${e.secret}.jpg`;
                const url = BASE_URL + encodeGetParams({ ...paramsPhotoGetInfo, "photo_id": e.id });

                return fetch(url, options)
                    .then(rawData => rawData.json())
                    .then(data => ({
                        tags: data.photo.tags.tag.map(e => e._content),
                        authorName: data.photo.owner.realname,
                        authorAlias: data.photo.owner.path_alias,
                        date: data.photo.dates.taken,
                        urlPhoto
                    }));
            });

            return {
                promiseItems: Promise.all(promises),
                totalPages
            };
        })
        .then(({ promiseItems, totalPages }) => {
            const items = promiseItems.then(data =>
                data.map(e => ({
                    urlPhoto: e.urlPhoto,
                    date: new Date(e.date),
                    author: e.authorName,
                    profile: `https://www.flickr.com/people/${e.authorAlias}/`,
                    tags: e.tags,
                }))
            );

            return {
                totalPages,
                items
            }
        });
}