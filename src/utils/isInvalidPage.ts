const MAX_PAGE = 500;

export default (segments: string[]) => segments.length !== 2
    || segments[ 0 ] !== 'page'
    || !/^[1-9]\d*$/.test(segments[ 1 ])
    || Number(segments[ 1 ]) > MAX_PAGE;
